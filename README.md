# Automation Testing project. 
This project contains Cypress end-to-end tests for Glassfrog project.
 
# Test Coverage
 1- Full system regression testing with cypress.
 2- Smoke testing with cypress
 3- Mobile accessibility testing with Axe DevTools and Cypress.

# Available Scripts
  ## Cypress open - execute tests when using the Test Runner
  In the project directory, you can run:
  **`npm run cypress:open:<enviroment>`**
  It open the test runner to execute tests in an specific enviroment: stg, qa, dev. 

  ## Cypress run - execute tests in console
  In the project directory, you can run:
  **`npm run cypress:run:<enviroment>`**
  It runs the cypress tests with the exception of accesability test suite (browser=chrome, reporter=cypress-multi-reporters)in an specific enviroment: stg, qa, dev. 

  **`npm run smoke:run:<enviroment>`**
  It runs the cypress tests of the Smoke Test Suite(browser=chrome, reporter=cypress-multi-reporters) in an specific enviroment: stg, prod. 

  **`npm run test:axe`**
  It executes Cypress accessibility tests and generated the report(csv,txt ) in the cypress folder (cypress/accessibility.txt, cypress/axeReport.csv)

  ## Reports Management
In the project directory, you can run:
**`npm run delete:testing:reports`**
It deletes the content of those testing folders: cypress/results_json and cypress/results_xml
 
**`npm run combine:xml:reports`**
Its combines the generated XML Test Reports in the folder cypress/results_xml in one file cypress/junit-report.xml.

**`npm run merge:json:reports`**
It  merges JSON Testing reports from folder cypress/results_json in one file cypress/mochawesome-report.json


# How to run tests
  1. **Install Dependencies:**
    ```bash
    npm install cypress
    npx install cypress

# Additional Information
  - **Test Directory:** All test files are located in the `cypress/e2e` directory.
  - **Configuration:** The Cypress configuration file is located at `cypress.config.js`.

# System regression testing scope:
Feel free to explore the test files to understand the test cases and scenarios covered.
Below is a list of available test suites:

Smoke Tests

Validate Homepage Load

Step 1: Access https://glassfrog.shop/

Expected Result: The homepage loads successfully without errors.

Step 2: Verify that the title and main elements are visible.

Expected Result: The page title is correct, and key elements such as the header, navigation, and footer are displayed.

Step 3: Validate that there are no console errors.

Expected Result: No JavaScript errors or warnings appear in the browser console.

Validate Navigation to Key Pages

Step 1: Navigate to the "Shop" page.

Expected Result: The "Shop" page loads successfully, displaying product listings.

Step 2: Navigate to "Shopping Cart".

Expected Result: The shopping cart page loads correctly, displaying any added products.

Step 3: Navigate to "Contact".

Expected Result: The contact page loads, showing a form or contact details.

Validate Search Functionality

Step 1: Enter a valid search term.

Expected Result: Search results related to the query are displayed.

Step 2: Verify that results are displayed.

Expected Result: The product listings update with relevant search results.

Step 3: Enter a non-existent term and validate the "no results" message.

Expected Result: A message indicating "No results found" is shown.

Validate Login Flow

Step 1: Go to "Login".

Expected Result: The login page loads successfully with input fields.

Step 2: Enter valid credentials.

Expected Result: The credentials are accepted, and login is processed.

Step 3: Verify that the user logs in successfully.

Expected Result: The user is redirected to their account dashboard or homepage with a success message.

Validate Adding Product to Cart

Step 1: Select a product.

Expected Result: The product details page loads correctly.

Step 2: Add it to the cart.

Expected Result: The product is added to the cart, and a confirmation message appears.

Step 3: Verify that the product appears in the cart.

Expected Result: The cart page displays the added product with correct details and pricing.
