// Karma configuration file, see link for more information
// https://karma-runner.github.io/1.0/config/configuration-file.html

// eslint-disable-next-line no-unused-vars
const appEnv = new (require(`../../node_modules/@tmessaoudi-official/dot-env-loader/dot-env-loader.run.js`).default)(
	`process`
).run();

const webdriver = require(`selenium-webdriver`);

module.exports = function (config) {
	config.set({
		basePath: `/`,
		instrumenterOptions: {
			istanbul: { noCompact: true }
		},
		frameworks: [`jasmine`, `@angular-devkit/build-angular`],
		plugins: [
			require(`karma-jasmine`),
			require(`karma-chrome-launcher`),
			require(`karma-selenium-webdriver-launcher`),
			require(`karma-jasmine-html-reporter`),
			require(`karma-coverage`),
			require(`@angular-devkit/build-angular/plugins/karma`)
		],
		client: {
			clearContext: false // leave Jasmine Spec Runner output visible in browser
		},
		jasmineHtmlReporter: {
			suppressAll: true // removes the duplicated traces
		},
		coverageReporter: {
			// specify a common output directory
			dir: require(`path`).join(__dirname, `./coverage`),
			subdir: `.`,
			reporters: [
				// reporters not supporting the `file` property
				{ type: `html`, subdir: `report-html` },
				{ type: `lcov`, subdir: `report-lcov` },
				// reporters supporting the `file` property, use `subdir` to directly
				// output them in the `dir` directory
				{ type: `cobertura`, subdir: `.`, file: `cobertura.txt` },
				{ type: `lcovonly`, subdir: `.`, file: `report-lcovonly.txt` },
				{ type: `teamcity`, subdir: `.`, file: `teamcity.txt` },
				{ type: `text`, subdir: `.`, file: `text.txt` },
				{ type: `text-summary`, subdir: `.`, file: `text-summary.txt` }
			]
		},
		reporters: [`progress`, `kjhtml`, `coverage`],
		hostname: appEnv.APP_TEST_UNIT_KARMA_HOSTNAME,
		port: 9876,
		colors: true,
		logLevel: config.LOG_INFO,
		autoWatch: false,
		customLaunchers: {
			swd_chrome: {
				base: `SeleniumWebdriver`,
				browserName: `Chrome`,
				getDriver: function () {
					// example from https://www.npmjs.com/package/selenium-webdriver#usage
					return new webdriver.Builder()
						.forBrowser(`chrome`)
						.usingServer(appEnv.APP_TEST_SELENIUM_ADDRESS)
						.build();
				}
			}
		},
		browsers: appEnv.APP_TEST_UNIT_KARMA_BROWSERS,
		singleRun: true,
		restartOnFileChange: false
	});
};
