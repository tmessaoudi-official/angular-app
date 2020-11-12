import {enableProdMode, LOCALE_ID} from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppHomeModule } from '../../app/i18n/home/app.home.module';
import { environment } from '../../environments/environment';

import { registerLocaleData } from '@angular/common';
const localeDummy = require(`@angular/common/locales/${process.env.APP_I18N_LOCALE_DEFAULT}`).default;
const localeDummyExtra = require(`@angular/common/locales/extra/${process.env.APP_I18N_LOCALE_DEFAULT}`).default;

registerLocaleData(localeDummy, `${process.env.APP_I18N_LOCALE_DUMMY}`, localeDummyExtra);

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppHomeModule, {
  providers: [
    { provide: LOCALE_ID, useValue: `${process.env.APP_I18N_LOCALE_DUMMY}` }
  ],
})
  .catch(err => console.error(err));
