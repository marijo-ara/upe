/// <reference types="cypress" />
describe("Login Test Suite", () => {
	beforeEach(function () {
		cy.visit(Cypress.config("baseUrl"));
		cy.fixture("data").then((data) => {
			this.data = data;
		});
		cy.fixture("selectors").then((selectors) => {
			this.selectors = selectors;
		});
	});

	it("UPDEV-1: Login as a Seller.", function () {
		const user = Cypress.env("sellerUserName");
		const pass = Cypress.env("sellerUserPassword");
		cy.login("seller", user, pass);
		cy.displayedExpectedUserName(Cypress.env("sellerName"));
	});


	it("UPDEV-2: Login as an User.", function () {
		const user = Cypress.env("userName");
		const pass = Cypress.env("userPassword");
		cy.login("user", user, pass);
		cy.displayedExpectedUserName(Cypress.env("userName"));
	});

	it("UPDEV-3: Login as an Admin.", function () {
		const user = Cypress.env("adminUserName");
		const pass = Cypress.env("adminPassword");
		cy.login("admin", user, pass);
		cy.displayedExpectedUserName(Cypress.env("adminUserName"));
	});


});

describe("Log Out  Test Suite", () => {
	let clinic = null;

	beforeEach(function () {
		cy.visit(Cypress.config("baseUrl"));
		cy.fixture("data").then((data) => {
			this.data = data;
			clinic = "SAOS";
		});
		cy.fixture("selectors").then((selectors) => {
			this.selectors = selectors;
		});
	});

	const testData = [
		{ "name": Cypress.env("dietitianUserName"), "password": Cypress.env("dietitianUserPassword"), "alias": "dietitianUser" },
		{ "name": Cypress.env("careTeamUserName"), "password": Cypress.env("careTeamUserPassword"), "alias": "careTeamUser" },
		{ "name": Cypress.env("clinicUserName"), "password": Cypress.env("clinicUserPassword"), "alias": "clinicUser" },
		{ "name": Cypress.env("nurseUserName"), "password": Cypress.env("nurseUserPassword"), "alias": "nurseUser" },
		{ "name": Cypress.env("financeUserName"), "password": Cypress.env("financeUserPassword"), "alias": "financeUser" },
		{ "name": Cypress.env("navigatorUserName"), "password": Cypress.env("navigatorUserPassword"), "alias": "navigatorUser" }
	];

	testData.forEach((credentials) => {
		it(`UPDEV-6: Log out in select clinic page and dashboard using the ${credentials.alias} role`, function () {
			cy.loginGoogleCode(credentials.alias, credentials.name, credentials.password);

			cy.log("Step : Click User Icon on the top menu");
			cy.get(".MuiContainer-root").as("pageContainer")
				.find("button[aria-controls=\"menu-appbar\"]", { timeout: 30000 })
				.click();
			cy.log("Expected Step : The log out option must be displayed");
			cy.document()
				.find("body")
				.find("a", { timeout: 20000 }).as("logout")
				.should("have.text", "Log Out")
				.should("have.attr", "href");

			cy.log("Step : Click log out");
			cy.get("@logout")
				.click();
			cy.log("Expected Step : The login page must be displayed");
			cy.validateLoginPage();

			cy.log("Step : Login Again");
			cy.loginGoogleCode(credentials.alias, credentials.name, credentials.password);

			cy.log("Step : Select a valid clinic");
			cy.selectClinicOnSelectClinicPage(clinic);
			if (credentials.alias === "financeUser" || credentials.alias === "clinicUser") {
				cy.log("My Actions no implemented.");
			}
			else {
				cy.goToAllPatientsTable();
			}

			cy.log("Step : Validate patient list view page(dashboard)");
			cy.get("table", { timeout: 20000 })
				.children()
				.should("have.length", 2);

			cy.log("Step : Click User Icon on the top menu");
			cy.get("@pageContainer")
				.find("button[aria-controls=\"menu-appbar\"]")
				.click();
			cy.log("Expected Step : The log out option must be displayed");
			cy.document()
				.find("body")
				.find("#menu-appbar")
				.find("ul >li", { timeout: 20000 })
				.should("have.length", 1)
				.first().as("logout")
				.should("have.text", "Log Out");

			cy.log("Step : Click log out");
			cy.get("@logout")
				.click();
			cy.log("Expected Step : The login page must be displayed");
			cy.validateLoginPage();
		});
	});

	it("UPDEV-7: Change Password by Care Team user", function () {
		const user = Cypress.env("careTeamUserName");

		cy.log("Step 1 : Click change password link on login page");
		cy.get(".MuiLink-underlineHover.MuiTypography-body2.MuiTypography-colorPrimary")
			.should("be.visible")
			.click();
		cy.log("Expected Step 1 : A new page must be displayed with a text description and a button");
		cy.get("h1")
			.should("be.visible")
			.should("have.text", "Reset Your Password");
		cy.get(".MuiTypography-root.MuiTypography-subtitle2")
			.should("be.visible")
			.should("have.text", "Please enter the email address associated with your account. Once submitted, an email will be sent with instructions on how to reset your password.");
		cy.get("#input-email-address").as("emailInput")
			.should("be.visible")
			.should("not.have.text");
		cy.get("*[role=button]")
			.should("have.length", 1)
			.should("have.text", "Cancel");
		cy.get("button").as("sendButton")
			.should("have.length", 1)
			.should("have.text", "Submit");

		cy.log("Step 2: Type the email ");
		cy.get("@emailInput")
			.type(user);
		cy.log("Expected Step 2 : Value on the input field");
		cy.get("@emailInput")
			.should("be.visible")
			.should("have.value", user);

		cy.log("Step 3: Click Send ");
		cy.get("@sendButton")
			.should("be.visible")
			.click();
		cy.log("Expected Step 3 : Text description must dissapear and a new one must be displayed instead");
		cy.get("h6")
			.should("have.text", "An email has been sent with instructions on how to reset you password.");
		cy.get("@emailInput")
			.should("not.exist");
		cy.get("*[role=button]").as("back")
			.should("have.length", 1)
			.should("have.text", "Back to login");

		cy.log("Step 4: Click Back to Login ");
		cy.get("@back")
			.click();
		cy.log("Expected Step 4: Dashboard wit patient list view must be displayed");
		cy.validateLoginPage();
	});
});
