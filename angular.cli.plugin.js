// eslint-disable-next-line no-unused-vars
const dotEnvLoader = new (require(`./node_modules/@tmessaoudi-official/dot-env-loader/dot-env-loader.run.js`).default)(
	`process`
);
const APP_ENV = dotEnvLoader.webpackify(dotEnvLoader.run());

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
