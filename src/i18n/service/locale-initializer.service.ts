import { Injectable } from '@angular/core';
import { registerLocaleData } from '@angular/common';

@Injectable({
	providedIn: `root`
})
export class LocaleInitializerService {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	static do(localeId: string, actualLocaleId?: string): Promise<any> {
		if (actualLocaleId === ``) {
			actualLocaleId = localeId;
		}
		return import(
			/* webpackInclude: /(en|fr|de|ar|es|pt|it)\.js$/ */
			/* webpackMode: "lazy" */
			/* webpackPrefetch: true */
			/* webpackPreload: true */
			`@angular/common/locales/${localeId}.js`
		).then((module) => {
			void import(
				/* webpackInclude: /(en|fr|de|ar|es|pt|it)\.js$/ */
				/* webpackMode: "lazy" */
				/* webpackPrefetch: true */
				/* webpackPreload: true */
				`@angular/common/locales/extra/${localeId}.js`
			).then((moduleExtra) => {
				registerLocaleData(
					// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
					module.default,
					actualLocaleId,
					// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
					moduleExtra.default
				);
			});
		});
	}
}
