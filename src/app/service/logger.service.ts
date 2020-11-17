import { Injectable } from '@angular/core';
import { processEnv } from '../../dot-env/process-env';

@Injectable({
	providedIn: `root`
})
export class LoggerService {
	constructor() {}
	log(message: any, format: string = `log`): void {
		if (processEnv.APP_DEBUG === true) {
			switch (format) {
				case `log`:
				default: {
					console.log(message);
				}
			}
		}
	}
}
