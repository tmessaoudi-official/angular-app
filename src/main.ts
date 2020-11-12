import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

import { registerLocaleData } from '@angular/common';
const localeDummy = require(`@angular/common/locales/${process.env.APP_I18N_LOCALE_DEFAULT}`).default;
const localeDummyExtra = require(`@angular/common/locales/extra/${process.env.APP_I18N_LOCALE_DEFAULT}`).default;

registerLocaleData(localeDummy, `${process.env.APP_I18N_LOCALE_DUMMY}`, localeDummyExtra);

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
