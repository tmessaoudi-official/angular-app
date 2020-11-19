// eslint-disable-next-line no-unused-vars
const appEnv = new (require(`./src/dot-env/dot-env-loader-run.dotenv.run`).default)(
	`process`
)
	.setFs(require(`fs`))
	.run();

const webpack = require(`webpack`);

process.exit(1);

exports.default = {
	pre(options) {
		// console.log('pre build');

		return options;
	},
	config(cfg) {
		cfg.plugins.push(
			new webpack.DefinePlugin({
				'APP_ENV': appEnv
			})
		);

		return cfg;
	},
	post(options) {
		// console.log('post build');

		return options;
	}
};
