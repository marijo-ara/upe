import { aliasQuery } from "../utils/graphql-test-utils";

describe('Smoke Test - GlassFrog Shop', () => {

	beforeEach(function () {
		cy.fixture("data").then((data) => {
			this.data = data;
			cy.wrap({ lastNamesArray: this.data.user.lastNames, firstNamesArray: this.data.user.firstNames }).as("userData");
		});
		cy.fixture("selectorsProd").then((selectors) => {
			this.selectors = selectors;
		});
		/* cy.intercept("POST", Cypress.env("apiGraphqlURL"), (req) => {
			aliasQuery(req, "GET_ACTIVITIES");
		}); */
	});

	const productosScenarios = [
		{ "descripcion": "Tennis", "expectedPrice": "10000", },
		{ "descripcion": "Accesorios", "expectedPrice": "15000", },
	];

	productosScenarios.forEach((producto, index) => {
		it('Validates Homepage Load', () => {
			cy.log('Step 1: Access the homepage');
			cy.url().should('eq', 'https://glassfrog.shop/');
			cy.log('✅ Expected: The homepage loads successfully without errors.');

			cy.log('Step 2: Verify that the title and main elements are visible');
			cy.title().should('include', 'GlassFrog');
			cy.get('header').should('be.visible');
			cy.get('footer').should('be.visible');
			cy.log('✅ Expected: The page title, header, and footer are visible.');

			cy.log('Step 3: Validate that there are no console errors');
			cy.window().then((win) => {
				expect(win.console.error).to.not.be.called;
			});
			cy.log('✅ Expected: No JavaScript errors appear in the console.');
		});

		it('Validates Navigation to Key Pages', () => {
			cy.log('Step 1: Navigate to the "Shop" page');
			cy.contains('Shop').click();
			cy.url().should('include', '/shop');
			cy.log('✅ Expected: The "Shop" page loads successfully.');

			cy.log('Step 2: Navigate to "Shopping Cart"');
			cy.contains('Shopping Cart').click();
			cy.url().should('include', '/cart');
			cy.log('✅ Expected: The shopping cart page loads successfully.');

			cy.log('Step 3: Navigate to "Contact"');
			cy.contains('Contact').click();
			cy.url().should('include', '/contact');
			cy.log('✅ Expected: The contact page loads successfully.');
		});

		it.skip('Validates Search Functionality', () => {
			cy.log('Step 1: Enter a valid search term');
			cy.get('input[placeholder="Search"]').type('product{enter}');
			cy.log('✅ Expected: The search should return relevant results.');

			cy.log('Step 2: Verify that results are displayed');
			cy.get('.results').should('be.visible');
			cy.log('✅ Expected: The product listings update with relevant results.');

			cy.log('Step 3: Enter a non-existent search term');
			cy.get('input[placeholder="Search"]').clear().type('nonexistentproduct{enter}');
			cy.contains('No results found').should('be.visible');
			cy.log('✅ Expected: A "No results found" message appears.');
		});

		it('Validates Adding Product to Cart', () => {
			cy.log('Step 1: Select a product');
			cy.contains('Add to Cart').first().click();
			cy.log('✅ Expected: The product is successfully added to the cart.');

			cy.log('Step 2: View the cart');
			cy.contains('View Cart').click();
			cy.log('✅ Expected: The cart page loads successfully.');

			cy.log('Step 3: Verify that the product appears in the cart');
			cy.get('.cart').should('contain', 'product');
			cy.log('✅ Expected: The cart contains the added product with correct details.');
		});
	});

});