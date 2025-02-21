
import totp from "totp-generator";
import "axe-core";
import "cypress-axe";
import "./commands-prod";
import moment from "moment";


Cypress.Commands.add("login", (user, username, password) => {
	cy.get("input[name=\"username\"]", { timeout: 20000 }).as("username");
	cy.get("input[name=\"password\"]").as("password");
	cy.get("button[type=submit]").as("loginBtn");

	cy.log("Step: Access to the Login Form with 5 elems and twp input fields.");
	cy.get(".MuiBox-root").as("form")
		.should("have.length", 5)
		.find("input")
		.should("have.length", 2);

	cy.log("Step: Type Username");
	cy.get("@username")
		.type(username);
	cy.log("Step: Type Password");
	cy.get("@password")
		.type(password);
	cy.log("Expected Steps: Verify that the values have been updated");
	cy.get("@username").should("have.value", username);
	cy.get("@password").should("have.value", password);

	cy.log("Step : Click Login");
	cy.get("@loginBtn").click();
	cy.log("Expected Step 4: Google Authentication page must be displayed with a form with an image, text and button");
	cy.get("@form")
		.find("img")
		.should("have.length", 1);

	cy.log("Expected Step 6: Clinic Selection Page must be displayed");
	cy.get("@form")
		.find("button")
		.should("have.text", "Verify ")
		.click();
});

Cypress.Commands.add("validateLoginPage", () => {
	cy.get("input[name=\"username\"]", { timeout: 30000 }).as("username")
		.should("be.visible");
	cy.get("input[name=\"password\"]").as("password")
		.should("be.visible");
	cy.get("button[type=submit]").as("loginBtn")
		.should("be.visible");
	cy.get(".MuiBox-root").as("form")
		.should("have.length", 5)
		.find("input")
		.should("have.length", 2);
});



