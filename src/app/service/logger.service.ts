import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
@Injectable({
	providedIn: `root`
})
export class LoggerService {
	constructor() {}
	log(message: any, format: string = `log`): void {
		if (environment.appDebug) {
			switch (format) {
				case `log`:
				default: {
					console.log(message);
				}
			}
		}
	}
}
