import { processEnv } from '../process-env';

export class EnvironmentNaming {
	camelize(str: string): string {
		const regex = new RegExp(
			`^([^\\` +
				processEnv.APP_ENV_VAR_WORD_SEPARATOR +
				`]*)|\\` +
				processEnv.APP_ENV_VAR_WORD_SEPARATOR +
				`([^\\` +
				processEnv.APP_ENV_VAR_WORD_SEPARATOR +
				`]*)`,
			`g`
		);
		return str.replace(regex, (match, chr) => {
			if (chr === match) {
				return chr.toLowerCase();
			} else if (typeof chr === `undefined`) {
				if (typeof match === `string`) {
					return (
						match.replace(`_`, ``).charAt(0).toUpperCase() +
						match.replace(`_`, ``).slice(1).toLowerCase()
					);
				}
				return ``;
			} else {
				return ``;
			}
		});
	}
}
