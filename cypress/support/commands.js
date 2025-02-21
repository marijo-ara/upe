
import "axe-core";
import "cypress-axe";
import "./commands-prod";
import moment from "moment";
import { CareTeamMembersScenarios } from "../e2e/data/upgraid_data";


Cypress.Commands.add("getFolderPath", (envConfigFile) => {
	let folderPath;
	switch (envConfigFile) {
		case "stg":
			folderPath = "./cypress/data_stg"; // specify your STG folder path
			break;
		case "qa":
			folderPath = "./cypress/data_qa"; // specify your QA folder path
			break;
		case "prod":
			folderPath = "./cypress/data_prod"; // specify your QA folder path
			break;
		case "dev":
			folderPath = "./cypress/data_dev"; // specify your QA folder path
			break;
		default:
			throw new Error(`Unknown environment configuration: ${envConfigFile}`);
	}
	return folderPath;
});

Cypress.Commands.add("checkAccessibility", (context, options, violationCallback, skipFailures) => {
	cy.injectAxe();
	cy.checkA11y(context, options, violationCallback, skipFailures);
});

Cypress.Commands.add("checkCheckbox", (name) => {
	cy.get(`input[type="checkbox"][name="${name}"]`)
		.check();
});

Cypress.Commands.add("checkCheckboxByValue", (value) => {
	cy.get(`input[type="checkbox"][value="${value}"]`)
		.check();
});

Cypress.Commands.add("calculateAgeByDob", (arrayDobs) => {
	cy.log(arrayDobs, "Input DOBS");
	const dobObject = {};
	for (let i = 0; i < arrayDobs.length; i++) {
		const today = new Date();
		const birthDate = new Date(arrayDobs[i]);
		let age = today.getFullYear() - birthDate.getFullYear();
		const m = today.getMonth() - birthDate.getMonth();
		if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
			age--;
		}
		dobObject[i] = age;
	}
	return cy.wrap(dobObject);
});


Cypress.Commands.add("clickHeader", (header) => {
	cy.get("table", { timeout: 30000 })
		.find("thead")
		.find("th")
		.contains(String(header))
		// .should("have.class", "MuiTypography-root")
		// .siblings("svg")
		.click();
});

Cypress.Commands.add("getSubstringBetweenCharsWithoutSpaces", (inputString, startChar, endChar) => {
	let startIndex = inputString.indexOf(startChar);
	if (startIndex === -1) {
		throw new Error(`${startChar} not found in ${inputString}`);
	}

	const endIndex = inputString.indexOf(endChar, startIndex);
	if (endIndex === -1) {
		throw new Error(`${endChar} not found after ${startChar} in ${inputString}`);
	}

	// Adjusting start index to include startChar if specified
	startIndex += startChar.length;

	const substring = inputString.substring(startIndex, endIndex).trim(); // Trim leading/trailing spaces
	return substring;
});

Cypress.Commands.add("generateInvalidPhoneNumber", () => {
	const validNumericChars = "0123456789";
	let invalidPhoneNumber = "1";

	// Generate the remaining 9 digits of the phone number
	for (let i = 0; i < 9; i++) {
		invalidPhoneNumber += validNumericChars.charAt(Math.floor(Math.random() * validNumericChars.length));
	}

	return cy.wrap(invalidPhoneNumber);
});

Cypress.Commands.add("generateRandomDates", (startYear, endYear) => {
	// Convert startYear and endYear to Date objects
	const startDate = new Date(startYear, 0, 1); // Start date
	const endDate = new Date(endYear, 11, 31); // End date

	// Generate a random date between startDate and endDate
	const randomDate = new Date(startDate.getTime() + (Math.random() * (endDate.getTime() - startDate.getTime())));

	// Format the date in MM/DD/YYYY format
	const mmddyyyyFormat = moment(randomDate).format("MM/DD/YYYY");

	// Format the date in YYYY-MM-DD format
	const yyyymmddFormat = moment(randomDate).format("YYYY-MM-DD");

	// Return an object with both formats
	return {
		mmddyyyy: mmddyyyyFormat,
		yyyymmdd: yyyymmddFormat,
	};
});


Cypress.Commands.add("extractNumbers", (inputString) => {
	const numbersOnly = inputString.replace(/\D/g, ""); // Remove all non-digit characters
	return numbersOnly;
});

Cypress.Commands.add("formatBMI", (value) => {
	const formattedValueTwoDigits = parseFloat(value).toFixed(2);
	const formattedValue = parseFloat(formattedValueTwoDigits);
	if (formattedValue % 1 === 0) {
		return parseFloat(formattedValue).toFixed(0);
	}
	if (formattedValueTwoDigits.endsWith("0")) {
		return parseFloat(formattedValue).toFixed(1);
	}
	return formattedValueTwoDigits;

});

