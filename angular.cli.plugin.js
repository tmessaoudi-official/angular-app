// eslint-disable-next-line no-unused-vars
const dotEnvLoader = new (require(`./src/dot-env/dot-env-loader-run.dot-env.run`).default)(
	`process`
);
const APP_ENV = dotEnvLoader.webpackify(dotEnvLoader.run());

if (APP_ENV.APP_DEBUG) {
	console.log(APP_ENV);
}

const webpack = require(`webpack`);

exports.default = {
	pre(options) {
		// console.log('pre build');

		return options;
	},
	config(cfg) {
		cfg.plugins.push(
			new webpack.DefinePlugin({
				'APP_ENV': APP_ENV
			})
		);

		return cfg;
	},
	post(options) {
		// console.log('post build');

		return options;
	}
};
