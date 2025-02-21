// Utility to match GraphQL mutation based on the operation name
export const hasOperationName = (req, operationName) => {
	const { body } = req;
	return (
		Object.prototype.hasOwnProperty.call(body, "operationName") && body.operationName === operationName
	);
};
  
// Alias query if operationName matches
export const aliasQuery = (req, operationName) => {
	if (hasOperationName(req, operationName)) {
		req.alias = `gql${operationName}Query`;
	}
};
  
// Alias mutation if operationName matches
export const aliasMutation = (req, operationName) => {
	if (hasOperationName(req, operationName)) {
		req.alias = `gql${operationName}Mutation`;
	}
};

// Intercept the GraphQL request for a specific mutation and modify the response status code
export const interceptGraphQLMutation = (mutationName, statusCode) => {
	cy.intercept("POST", "/graphql", (req) => {
	// Check if the request is for the specified mutation
		if (hasOperationName(req, mutationName)) {
			aliasMutation(req, mutationName); // Alias the mutation for easier reference
			req.reply({
				statusCode: statusCode, // default
				fixture: "sendSMS_400response.json"
			});
		}
	});	
};