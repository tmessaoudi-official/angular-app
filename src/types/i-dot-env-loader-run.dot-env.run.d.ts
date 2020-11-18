// eslint-disable-next-line no-unused-vars
declare interface IDotEnvLoaderRun extends IDotEnvLoader {
	fs: any | null;
	config: Array<string | Array<Array<string>>> | null;
	// eslint-disable-next-line no-unused-vars
	setFs(fs: any): IDotEnvLoaderRun;
	// eslint-disable-next-line no-unused-vars
	getFs(): any;
	// eslint-disable-next-line no-unused-vars
	validateFs(): void;
	// by default it is ./.app.env/.config it should be encoded with utf8
	run(
		// eslint-disable-next-line no-unused-vars
		env?: string,
		// eslint-disable-next-line no-unused-vars
		envConfigPath?: string,
		// eslint-disable-next-line no-unused-vars
		encoding?: string,
		// eslint-disable-next-line no-unused-vars
		putInProcessEnv?: boolean
	): Array<string | Array<string>> | [];
	fileExists(
		// eslint-disable-next-line no-unused-vars
		filePath: string,
		// eslint-disable-next-line no-unused-vars
		error: { message: string; error?: boolean }
	): boolean;
	load(
		// eslint-disable-next-line no-unused-vars
		filePath: string | { current?: string; from?: string },
		// eslint-disable-next-line no-unused-vars
		encoding?: string,
		// eslint-disable-next-line no-unused-vars
		isConfig?: boolean
	): Array<string | Array<string>> | [];
	include(
		// eslint-disable-next-line no-unused-vars
		filePath: string | { current?: string; from?: string },
		// eslint-disable-next-line no-unused-vars
		content: Array<string | Array<string>> | [],
		// eslint-disable-next-line no-unused-vars
		encoding?: string,
		// eslint-disable-next-line no-unused-vars
		debug?: boolean,
		// eslint-disable-next-line no-unused-vars
		isConfig?: boolean
	): Array<string | Array<string>> | [];
	// eslint-disable-next-line no-unused-vars
	populate(x: string): string;
}
