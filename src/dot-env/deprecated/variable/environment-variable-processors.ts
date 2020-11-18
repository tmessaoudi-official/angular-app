import { Injectable } from '@angular/core';
import { processEnv } from '../../process-env';

@Injectable({
	providedIn: `root`
})
export class EnvironmentVariableProcessors {
	constructor() {}

	public process(
		value: any | string | undefined | never,
		name: string | undefined = ``,
		fail?: any
	): any | string | undefined | never {
		if (
			typeof value[0] !== `undefined` &&
			typeof value[0][0] !== `undefined`
		) {
			if (value[0][0] === `environment.processors.json`) {
				return this.processJson(value[1], name, fail, value[0]);
			} else if (value[0][0] === `environment.processors.none`) {
				return value[1];
			} else if (value[0][0] === `environment.processors.empty`) {
				return this.processEmpty(value[1], name, fail, value[0]);
			} else if (value[0][0].indexOf(`environment.processors.`) === 0) {
				console.log(value);
				throw new Error(
					`Environment variable processor '` +
						value[0][0] +
						`' does not exist`
				);
			}
		}

		return value[1];
	}

	private processJson(
		value: string,
		name?: string,
		fail?: any,
		config?: any
	): object | null | undefined {
		let json: any;
		try {
			json = JSON.parse(value);
		} catch (exception) {
			if (processEnv.APP_DEBUG === `true`) {
				console.warn(
					` ** Environment variable '` +
						name +
						`' contains invalid json`
				);
				console.warn(exception);
				console.warn(fail);
				console.warn(config);
			}
			const canFail = config.find(
				(configValue: string): any =>
					configValue === `fail=true` || configValue === `fail`
			);
			if (
				fail === true ||
				(typeof config !== `undefined` &&
					typeof canFail !== `undefined`)
			) {
				console.log(canFail);
				console.log(fail);
				console.log(fail);
				throw new Error(
					`Cannot parse environment variable '` + name + `'`
				);
			}

			return {};
		}
		return json;
	}

	private processEmpty(
		value: any,
		// eslint-disable-next-line no-unused-vars
		name?: string,
		// eslint-disable-next-line no-unused-vars
		fail?: any,
		// eslint-disable-next-line no-unused-vars
		config?: any
	): any | null | undefined {
		if (value === `undefined`) {
			return undefined;
		} else if (value === `null`) {
			return null;
		} else {
			return value;
		}
	}
}
