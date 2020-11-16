import {Injectable} from '@angular/core';
import {registerLocaleData} from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class LocaleInitializerService {

  constructor() {
  }

  static do(localeId: string, actualLocaleId?: string): Promise<any> {
    if (actualLocaleId === '') {
      actualLocaleId = localeId;
    }
    return import(
      /* webpackInclude: /(en|fr|de|ar|es|pt|it)\.js$/ */
      `@angular/common/locales/${localeId}.js`
      ).then(module => {
        import(
          /* webpackInclude: /(en|fr|de|ar|es|pt|it)\.js$/ */
          `@angular/common/locales/extra/${localeId}.js`
          ).then(moduleExtra => {
          registerLocaleData(module.default, actualLocaleId, moduleExtra.default);
        });
      });
  }
}
