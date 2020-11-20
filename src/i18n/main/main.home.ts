import { enableProdMode, LOCALE_ID, ViewEncapsulation } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppHomeModule } from '../../app/i18n/home/app.home.module';
import { environment } from '../../environments/environment';

import { LocaleInitializerService } from '../service/locale-initializer.service';
import { processEnv } from '../../dot-env/process-env';

LocaleInitializerService.do(
	processEnv.APP_I18N_LOCALE_DEFAULT,
	processEnv.APP_I18N_LOCALE_DUMMY
);

// @ts-ignore : this variable comes when building, if it's not there we can't build !!
environment.appI18nSupportedLocales.forEach((value: I18nLocale) => {
	LocaleInitializerService.do(value.id);
});

if (environment.production) {
	enableProdMode();
}

platformBrowserDynamic()
	.bootstrapModule(AppHomeModule, {
		defaultEncapsulation: ViewEncapsulation.ShadowDom,
		providers: [
			{ provide: LOCALE_ID, useValue: processEnv.APP_I18N_LOCALE_DUMMY }
		]
	})
	.catch((err) => console.error(err));
