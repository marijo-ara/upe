/// <reference types="cypress" />


describe("Web Accesability Test Suite", () => {

	function terminalLog(violations) {
		cy.task(
			"log",
			`${violations.length} accessibility violation${
				violations.length === 1 ? "" : "s"
			} ${violations.length === 1 ? "was" : "were"} detected`
		);
		// pluck specific keys to keep the table readable
		const violationData = violations.map(
			({ id, impact, description, nodes, help, helpUrl }) => ({
				id,
				impact,
				description,
				nodes: nodes.length,
				spec: Cypress.spec.name,
				help,
				helpUrl,
			})
		);
  
		cy.task("table", violationData);

		cy.task("writeToCsv", { name: "axeReport", data: violationData });
	}

	it("Logs a11y violations to the terminal on load(login page)", () => {
		cy.visit(Cypress.config("baseUrl"));
		cy.checkAccessibility(null, null, terminalLog);
	});
	
	it("Logs a11y violations to the terminal after a google code is verified as Financial User", () => {
		cy.visit(Cypress.config("baseUrl"));
		const user = Cypress.env("financeUserName");
		const pass = Cypress.env("financeUserPassword");
     
		cy.log("Step 1: Log in as a Finace User using Google Authentication.");
		cy.loginGoogleCode("financeUser", user, pass);
		cy.checkAccessibility(null, null, terminalLog);
		cy.log("Expected Step 1: The clinic selection page must be displayed with three clinics");
		cy.displayedExpectedClinicsAmount(3);	
		cy.checkAccessibility(null, null, terminalLog);
	});

	it("Logs a11y violations to the terminal after a google code is verified as Care Team User", () => {
		cy.visit(Cypress.config("baseUrl"));
		const user = Cypress.env("careTeamUserName");
		const pass = Cypress.env("careTeamUserPassword");

		cy.log("Step 1: Log in as a Finace User using Google Authentication.");
		cy.loginGoogleCode("financeUser", user, pass);
		cy.checkAccessibility(null, null, terminalLog);
		cy.log("Expected Step 1: The clinic selection page must be displayed with three clinics");
		cy.displayedExpectedClinicsAmount(3);	
		cy.checkAccessibility(null, null, terminalLog);
	});

	// Applying a context and run parameters
	it("Logs a11y violations to the terminal on load(login page) (with custom parameters)", () => {
		cy.visit(Cypress.config("baseUrl"));
		cy.checkAccessibility(".MuiBox-root", {
			runOnly: {
				type: "tag",
				values: ["wcag2a"]
			}
		}, terminalLog);
	});
  
	it("Logs a11y violations to the terminal on load(login page)d (filtering to only include critical impact violations)", () => {
		cy.visit(Cypress.config("baseUrl"));
		cy.checkAccessibility(null, {
			includedImpacts: ["critical"]
		}, terminalLog);
	});
  
	it("Logs a11y violations to the terminal after selecting a clinic as Care Team User", () => {
		cy.visit(Cypress.config("baseUrl"));
		const user = Cypress.env("careTeamUserName");
		const pass = Cypress.env("careTeamUserPassword");
		const clinic = Cypress.env("clinic");
		cy.log("Step 1: Log in as a Care Team User using Google Authentication.");
		cy.loginGoogleCode("careTeamUser", user, pass);
		cy.log("Expected Step 1: The clinic selection page must be displayed with three clinics");
		cy.displayedExpectedClinicsAmount(3);

		cy.log("Step 2: Click 'Select' from one clinic with at least one patient assigned");
		cy.selectClinicOnSelectClinicPage(clinic);
		cy.goToAllPatientsTable();
		cy.checkAccessibility(null, null, terminalLog);
	});
  
	it("Only logs a11y violations while allowing the test to pass", () => {
	// Do not fail the test when there are accessibility failures
		cy.visit(Cypress.config("baseUrl"));
		cy.checkAccessibility(null, null, terminalLog, true);

	});
  
	it("Logs a11y violations to the terminal after asynchronous load", () => {
	// Retry the check if there are initial failures
		cy.checkAccessibility(null, {
			retries: 3,
			interval: 100
		},terminalLog);
	});
});
