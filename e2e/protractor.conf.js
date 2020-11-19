// @ts-check
// Protractor configuration file, see link for more information
// https://github.com/angular/protractor/blob/master/lib/config.ts
// eslint-disable-next-line no-unused-vars
const appEnv = new (require(`./src/dot-env/dot-env-loader-run.dotenv.run`).default)(
	`process`
)
	.setFs(require(`fs`))
	.run();

// @ts-ignore
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
			project: require(`path`).join(__dirname, `./tsconfig.json`)
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

if (typeof appEnv.APP_TEST_E2E_PROTRACTOR_SELENIUM_ADDRESS !== `string`) {
	// @ts-ignore
	protractorConfig.seleniumAddress =
		appEnv.APP_TEST_E2E_PROTRACTOR_SELENIUM_ADDRESS;
}

if (typeof process.env.APP_TEST_E2E_PROTRACTOR_DIRECT_CONNECT === `boolean`) {
	// @ts-ignore
	protractorConfig.directConnect =
		appEnv.APP_TEST_E2E_PROTRACTOR_DIRECT_CONNECT;
} else {
	// @ts-ignore
	protractorConfig.directConnect = true;
}

if (
	typeof appEnv.APP_TEST_E2E_PROTRACTOR_BASE_URL === `string` &&
	appEnv.APP_TEST_E2E_PROTRACTOR_BASE_URL !== ``
) {
	// @ts-ignore
	protractorConfig.baseUrl = appEnv.APP_TEST_E2E_PROTRACTOR_BASE_URL;
} else {
	// @ts-ignore
	protractorConfig.baseUrl = `http://localhost:4200/`;
}

if (
	process.env.APP_LOCALE !== undefined &&
	// @ts-ignore
	protractorConfig.seleniumAddress !== undefined
) {
	// @ts-ignore
	protractorConfig.baseUrl += `` + appEnv.APP_LOCALE + `/`;
}

/**
 * @type { import("protractor").Config }
 */
exports.config = protractorConfig;
