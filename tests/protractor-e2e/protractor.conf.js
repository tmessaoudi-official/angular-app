// Protractor configuration file, see link for more information
// https://github.com/angular/protractor/blob/master/lib/config.ts
// eslint-disable-next-line no-unused-vars
const appEnv = new (require(`../../node_modules/@tmessaoudi-official/dot-env-loader/dot-env-loader.run.js`).default)(
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
	seleniumAddress: appEnv.APP_TEST_SELENIUM_ADDRESS,
	directConnect: appEnv.APP_TEST_E2E_PROTRACTOR_DIRECT_CONNECT,
	baseUrl:
		appEnv.APP_TEST_E2E_PROTRACTOR_BASE_URL +
		(appEnv.APP_TEST_SELENIUM_ADDRESS !== undefined &&
		appEnv.APP_LOCALE !== undefined
			? `` + appEnv.APP_LOCALE + `/`
			: ``),
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

console.log(protractorConfig);

/**
 * @type { import("protractor").Config }
 */
exports.config = protractorConfig;
