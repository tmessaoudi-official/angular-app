import DotEnvLoader from './dot-env-loader.dotenv';

export default class DotEnvLoaderRun
	extends DotEnvLoader
	implements IDotEnvLoaderRun {
	source: EDotEnvLoaderSource;

	constructor();

	constructor(source?: EDotEnvLoaderSource) {
		if (typeof source === `undefined` || source === null) {
			source = EDotEnvLoaderSource.Process;
		}
		// @ts-ignore
		super(source);
		this.source = source;
	}

	run(x: string): string {
		return x + ` !! run DotEnvLoaderRun, source : ` + this.source;
	}

	// eslint-disable-next-line no-unused-vars
	load(x: string): string {
		return ``;
	}

	// eslint-disable-next-line no-unused-vars
	populate(x: string): string {
		return ``;
	}
}
