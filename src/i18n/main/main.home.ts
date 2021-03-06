import { enableProdMode, LOCALE_ID, ViewEncapsulation } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppHomeModule } from '../../app/i18n/home/app.home.module';
import { environment } from '../../environments/environment';

import { LocaleInitializerService } from '../service/locale-initializer.service';

void LocaleInitializerService.do(
	environment.appI18nLocaleDefault,
	environment.appI18nLocaleDummy
);

environment.appI18nSupportedLocales.forEach((value: I18nLocale) => {
	void LocaleInitializerService.do(value.id);
});

if (environment.production) {
	enableProdMode();
}

platformBrowserDynamic()
	.bootstrapModule(AppHomeModule, {
		defaultEncapsulation: ViewEncapsulation.ShadowDom,
		providers: [
			{ provide: LOCALE_ID, useValue: environment.appI18nLocaleDummy }
		]
	})
	.catch((err) => console.error(err));
