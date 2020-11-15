import { Inject, Injectable, LOCALE_ID } from '@angular/core';
import { environment } from '../../../environments/environment';
import { LoggerService } from '../../../app/logger.service';

@Injectable({
  providedIn: 'root'
})
export class I18nSwitcherService {
  public locales: Array<I18nLocale>;

  constructor(@Inject(LOCALE_ID) public locale: string, @Inject(LoggerService) public loggerService: LoggerService) {
    this.locales = environment.appI18nSupportedLocales;
  }

  switch(locale: string = ''): void {
    localStorage.setItem('locale', locale);
    if (locale === '') {
      window.location.href = `/${window.location.hash}`;
    } else {
      window.location.href = `/${locale}/${window.location.hash}`;
    }
  }
  isLocaleDummy(): boolean {
    let pathLocale = '';
    if (environment.appI18nSwitcherCheckPathLocale === true) {
      const splittedPathname = window.location.pathname.split('/');
      if (splittedPathname[splittedPathname.length - 1] !== '') {
        pathLocale = splittedPathname[splittedPathname.length - 1];
      } else if (splittedPathname[splittedPathname.length - 2] !== '') {
        pathLocale = splittedPathname[splittedPathname.length - 2];
      }
    }
    if (environment.appDebug === true) {
      console.log('pathLocale === environment.appI18nLocaleDummy');
      console.log(pathLocale);
      console.log(environment.appI18nLocaleDummy);
      console.log(pathLocale === environment.appI18nLocaleDummy);
      console.log('this.locale === environment.appI18nLocaleDummy');
      console.log(this.locale === environment.appI18nLocaleDummy);
      console.log(this.locale);
      console.log(environment.appI18nLocaleDummy);
      console.log('environment.appI18nIsLocaleDummy');
      console.log(environment.appI18nIsLocaleDummy);
      console.log('!this.locales.find(locale => locale.id === this.locale)');
      console.log(!this.locales.find(locale => locale.id === this.locale));
    }
    return (
      pathLocale === environment.appI18nLocaleDummy ||
      this.locale === environment.appI18nLocaleDummy ||
      environment.appI18nIsLocaleDummy ||
      !this.locales.find(locale => locale.id === this.locale));
  }
  init(): void {
    if (environment.appDebug === true) {
      console.log('this.locale');
      console.log(this.locale);
      console.log(window.location.href);
    }
    if (environment.appI18nSwitcherBehaviour === 'disabled') {
      return;
    }
    if (environment.appI18nSwitcherBehaviour === '/') {
      if (window.location.href !== '/') {
        this.switch();
      }
    } else if (environment.appI18nSwitcherBehaviour === 'default') {
      if (environment.appDebug === true) {
        console.log('this.isLocaleDummy()');
        console.log(this.isLocaleDummy());
      }
      if (this.isLocaleDummy()) {
        let targetLocale = '';
        if (!localStorage.getItem('locale')) {
          localStorage.setItem('locale', environment.appI18nLocaleDefault);
          targetLocale = environment.appI18nLocaleDefault;
        } else {
          targetLocale = localStorage.getItem('locale');
        }
        this.switch(targetLocale);
      } else {
        localStorage.setItem('locale', this.locale);
      }
    }
  }
}
