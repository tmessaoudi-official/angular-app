import {enableProdMode} from '@angular/core';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';

import {AppModule} from './app/app.module';
import {environment} from './environments/environment';

import {LocaleInitializerService} from './i18n/service/locale-initializer.service';

LocaleInitializerService.do(process.env.APP_I18N_LOCALE_DEFAULT, process.env.APP_I18N_LOCALE_DUMMY);

environment.appI18nSupportedLocales.forEach(((value: I18nLocale, index: number, array: I18nLocale[]) => {
  LocaleInitializerService.do(value.id);
}));

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
