import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
@Injectable({
	providedIn: `root`
})
export class LoggerService {
	log(message: never, format: string = `log`): LoggerService {
		if (environment.appDebug) {
			switch (format) {
				case `log`:
				default: {
					console.log(message);
				}
			}
		}
		return this;
	}
}
