import { enableProdMode, ViewEncapsulation } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

import { LocaleInitializerService } from './i18n/service/locale-initializer.service';

void LocaleInitializerService.do(
	environment.appI18nLocaleDefault,
	environment.appI18nLocaleDummy
);

// @ts-ignore : this variable comes when building, if it's not there we can't build !!
environment.appI18nSupportedLocales.forEach((value: I18nLocale) => {
	void LocaleInitializerService.do(value.id);
});

if (environment.production) {
	enableProdMode();
}

platformBrowserDynamic()
	.bootstrapModule(AppModule, {
		defaultEncapsulation: ViewEncapsulation.ShadowDom
	})
	.catch((err) => console.error(err));
