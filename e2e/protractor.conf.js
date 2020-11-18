// @ts-check
// Protractor configuration file, see link for more information
// https://github.com/angular/protractor/blob/master/lib/config.ts

// @ts-ignore
const { SpecReporter, StacktraceOption } = require(`jasmine-spec-reporter`);
const Loader = require(`../webpack/dotenv/Loader.js`);

const processNodeEnv =
	typeof process.env.NODE_ENV_FORCE === `string` &&
	process.env.NODE_ENV_FORCE !== ``
		? process.env.NODE_ENV_FORCE
		: typeof process.env.NODE_ENV === `undefined` ||
		  (typeof process.env.NODE_ENV === `string` &&
				process.env.NODE_ENV !== ``)
		? process.env.NODE_ENV
		: `test`;

const forceEnvRebuild =
	typeof process.env.APP_ENV_RUN_BUILD === `undefined` ||
	(typeof process.env.APP_ENV_RUN_BUILD === `string` &&
		(process.env.APP_ENV_RUN_BUILD === `` ||
			process.env.APP_ENV_RUN_BUILD === `true`)) ||
	typeof process.env.APP_ENV_FORCE_REBUILD === `undefined` ||
	(typeof process.env.APP_ENV_FORCE_REBUILD === `string` &&
		(process.env.APP_ENV_FORCE_REBUILD === `` ||
			process.env.APP_ENV_FORCE_REBUILD === `true`));

Loader.run(processNodeEnv, forceEnvRebuild);

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

const seleniumAddress = Loader.unquote.value(
	process.env.APP_E2E_PROTRACTOR_SELENIUM_ADDRESS
);

if (typeof seleniumAddress === `string` && seleniumAddress !== ``) {
	// @ts-ignore
	protractorConfig.seleniumAddress = seleniumAddress;
}

const directConnect = process.env.APP_E2E_PROTRACTOR_DIRECT_CONNECT === `true`;

if (
	typeof process.env.APP_E2E_PROTRACTOR_DIRECT_CONNECT !== `undefined` &&
	typeof directConnect === `boolean`
) {
	// @ts-ignore
	protractorConfig.directConnect = directConnect;
} else {
	// @ts-ignore
	protractorConfig.directConnect = true;
}

const baseUrl = Loader.unquote.value(process.env.APP_E2E_PROTRACTOR_BASE_URL);

if (typeof baseUrl === `string` && baseUrl !== ``) {
	// @ts-ignore
	protractorConfig.baseUrl = baseUrl;
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
	protractorConfig.baseUrl += `` + process.env.APP_LOCALE + `/`;
}

console.log(protractorConfig);
/**
 * @type { import("protractor").Config }
 */
exports.config = protractorConfig;
