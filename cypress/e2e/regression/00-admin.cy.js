/// <reference types="cypress" />
import { CareTeamMembersScenarios } from "../data/app_data";

describe("Admin Test Suite", () => {
	beforeEach(function () {
		cy.visit(Cypress.env("studio"));
		cy.fixture("data").then((data) => {
			this.data = data;
		});
		cy.fixture("selectors").then((selectors) => {
			this.selectors = selectors;
		});
	});

	const rolesUsersScenarios = [
		{ "type": "user", "expectedNumbersProducts": 5 },
		{ "type": "admin", "expectedNumbersProducts": 5 },
		{ "type": "seller", "expectedNumbersProducts": 5 },
	];


	rolesUsersScenarios.forEach((user) => {
		it(`Test-1: Make sure the ${user.type} user is assigned to the ${team.expectedNumbersProducts} products.`, function () {
			const userName = Cypress.env("adminUserName");
			const pass = Cypress.env("adminUserPassword");
			const adminName = Cypress.env("adminName");
			const careTeamUser = Cypress.env(`${team.type}UserName`);
			cy.login("adminUser", userName, pass);

			cy.log("Expected Step 6: The clinic selection page must be displayed with exected clinic(s) and the Dietitian User name must be next to the user icon");
			cy.displayedExpectedUserName(adminName);


		});
	});
});

