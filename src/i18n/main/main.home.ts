import {enableProdMode, LOCALE_ID} from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppHomeModule } from '../../app/i18n/home/app.home.module';
import { environment } from '../../environments/environment';

import { LocaleInitializerService} from '../service/locale-initializer.service';

LocaleInitializerService.do(process.env.APP_I18N_LOCALE_DEFAULT, process.env.APP_I18N_LOCALE_DUMMY);

environment.appI18nSupportedLocales.forEach(((value: I18nLocale, index: number, array: I18nLocale[]) => {
  LocaleInitializerService.do(value.id);
}));

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppHomeModule, {
  providers: [
    { provide: LOCALE_ID, useValue: `${process.env.APP_I18N_LOCALE_DUMMY}` }
  ],
})
  .catch(err => console.error(err));
