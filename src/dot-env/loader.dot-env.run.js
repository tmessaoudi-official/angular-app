// eslint-disable-next-line no-unused-vars
const dotEnvLoaderRun = new (require(`./dot-env-loader-run.dotenv.run`).default)(
	`dummyProcess`
)
	.setFs(require(`fs`))
	.run();
