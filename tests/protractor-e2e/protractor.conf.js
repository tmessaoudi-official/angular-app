// Protractor configuration file, see link for more information
// https://github.com/angular/protractor/blob/master/lib/config.ts
// eslint-disable-next-line no-unused-vars
const appEnv = new (require(`../../src/dot-env/dot-env-loader-run.dot-env.run`).default)(
	`process`
).run();

const { SpecReporter, StacktraceOption } = require(`jasmine-spec-reporter`);

const protractorConfig = {
	allScriptsTimeout: 11000,
	specs: [`./src/**/*.e2e-spec.ts`],
	capabilities: {
		browserName: `chrome`
	},
	SELENIUM_PROMISE_MANAGER: false,
	framework: `jasmine`,
	jasmineNodeOpts: {
		showColors: true,
		defaultTimeoutInterval: 30000,
		print: function () {}
	},
	onPrepare() {
		require(`ts-node`).register({
			project: require(`path`).join(__dirname, `./tsconfig.e2e.json`)
		});
		jasmine.getEnv().addReporter(
			new SpecReporter({
				spec: {
					displayStacktrace: StacktraceOption.PRETTY
				}
			})
		);
	}
};

if (typeof appEnv.APP_TEST_E2E_PROTRACTOR_SELENIUM_ADDRESS === `string`) {
	protractorConfig.seleniumAddress =
		appEnv.APP_TEST_E2E_PROTRACTOR_SELENIUM_ADDRESS;
}

if (typeof appEnv.APP_TEST_E2E_PROTRACTOR_DIRECT_CONNECT === `boolean`) {
	protractorConfig.directConnect =
		appEnv.APP_TEST_E2E_PROTRACTOR_DIRECT_CONNECT;
} else {
	protractorConfig.directConnect = true;
}

if (
	typeof appEnv.APP_TEST_E2E_PROTRACTOR_BASE_URL === `string` &&
	appEnv.APP_TEST_E2E_PROTRACTOR_BASE_URL !== ``
) {
	protractorConfig.baseUrl = appEnv.APP_TEST_E2E_PROTRACTOR_BASE_URL;
} else {
	protractorConfig.baseUrl = `http://localhost:4200/`;
}

if (
	appEnv.APP_LOCALE !== undefined &&
	protractorConfig.seleniumAddress !== undefined
) {
	protractorConfig.baseUrl += `` + appEnv.APP_LOCALE + `/`;
}

console.log(protractorConfig);

/**
 * @type { import("protractor").Config }
 */
exports.config = protractorConfig;
