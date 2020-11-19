import { enableProdMode, ViewEncapsulation } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

import { LocaleInitializerService } from './i18n/service/locale-initializer.service';
import { processEnv } from './dot-env/process-env';

LocaleInitializerService.do(
	processEnv.APP_I18N_LOCALE_DEFAULT,
	processEnv.APP_I18N_LOCALE_DUMMY
);

// @ts-ignore
environment.appI18nSupportedLocales.forEach((value: I18nLocale) => {
	LocaleInitializerService.do(value.id);
});

if (environment.production) {
	enableProdMode();
}

platformBrowserDynamic()
	.bootstrapModule(AppModule, {
		defaultEncapsulation: ViewEncapsulation.ShadowDom
	})
	.catch((err) => console.error(err));
