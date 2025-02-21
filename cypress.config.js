
import { defineConfig } from "cypress";
import { plugins } from "cypress-social-logins";
import "dotenv/config";
import fs from "fs-extra";
import path from "path";

const googleSocialLogin = plugins.GoogleSocialLogin;

export default defineConfig({
	e2e: {
		setupNodeEvents(on, config) {
			on("before:browser:launch", (browser = {}, launchOptions) => {
				if (browser.name === "chrome" && browser.isHeadless) {
					launchOptions.args.push("--incognito");
				}
				if (browser.name === "chrome" && !browser.isHeadless) {
					launchOptions.args.push("--incognito");
				}
				if (browser.name === "firefox") {
					launchOptions.args.push("-private");
				}
				return launchOptions;
			});

			const fetchConfigurationByFile = file => {
				const pathOfConfigurationFile = `./cypress.${file}.json`;
				return (file && fs.readJson(path.join("./", pathOfConfigurationFile))
				);
			};
			on("task", {
				GoogleSocialLogin: googleSocialLogin,
			});
			on("task", {
				async downloads(downloadsPath) {
					return fs.readdirSync(downloadsPath);
				},
			});
			on("task", {
				async csvToJson(data) {
					const lines = data.split("\n");
					const result = [];
					const headers = lines[0].split(",");
					for (let i = 1; i < lines.length; i++) {

						const obj = {};
						const currentline = lines[i].split(",");

						for (let j = 0; j < headers.length; j++) {
							obj[headers[j]] = currentline[j];
						}
						result.push(obj);
					}
					// console.log(result)
					return result;
				},
			});
			const pathToAxeReportFile = path.resolve(".", "cypress");
			on("task", {
				log(message) {
					cy.log(message);
					return null;
				},
				table(message) {
					cy.table(message);
					return null;
				},
				writeToCsv({ name: name, data: data }) {
					fs.writeFileSync(`${pathToAxeReportFile}/${name}.csv`, JSON.stringify(data), { flags: "a+", headers: true, writeHeaders: false, objectMode: true, includeEndRowDelimiter: true });
					return null;

				},
			});
			const environment = config.env.configFile || "qa" || "stg" || "prod" || "dev";
			const configurationForEnvironment = fetchConfigurationByFile(environment);
			return configurationForEnvironment || config;
		},
		testIsolation: true,
		video: false,
		experimentalRunAllSpecs: true,
		experimentalMemoryManagement: false,
		numTestsKeptInMemory: 0,
		chromeWebSecurity: false,
		waitForAnimations: false,
		viewportWidth: 1920,
		viewportHeight: 1080,
		reporter: "cypress-multi-reporters",
		reporterOptions: {
			reporterEnabled: "mochawesome, mocha-junit-reporter",
			mochaJunitReporterReporterOptions: {
				mochaFile: "cypress/results_xml/upgraid_result[hash].xml",
				toConsole: true,
			},
			mochawesomeReporterOptions: {
				charts: true,
				reportDir: "cypress/results_json",
				overwrite: false,
				html: true,
				json: true,
			},
		},
	},
	"retries": {
		"runMode": 1, // Number of retries for the entire test run
		"openMode": 1 // Number of retries for each test when using the Test Runner
	},
	"axe": {
		"enableOnBeforeRun": false,
		"runOnly": {
			"type": "tag",
			"values": ["wcag2a", "wcag21aa", "wcag2aa"],
		},
		"rules": {
			"color-contrast": { "enabled": true },
			"image-alt": { "enabled": true },
			// Add more rules as needed
		},
		"thresholds": {
			"axeResults.violations": 0,
			"axeResults.incomplete": 0,
			"axeResults.passes": 0,
			"axeResults.inapplicable": 0
		}
	}
});
