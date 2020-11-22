import { Inject, Injectable, LOCALE_ID } from '@angular/core';
import { I18nSwitcherService } from './switcher/i18n.switcher.service';
import { environment } from '../../environments/environment';

@Injectable({
	providedIn: `root`
})
export class I18nLocaleService {
	locales: Array<I18nLocale>;

	constructor(
		// eslint-disable-next-line no-unused-vars
		@Inject(LOCALE_ID) public locale: string,
		// eslint-disable-next-line no-unused-vars
		// prettier-ignore
		@Inject(I18nSwitcherService)
      // eslint-disable-next-line no-unused-vars
      public i18nSwitcherService: I18nSwitcherService
	) {
		this.locales = environment.appI18nSupportedLocales;
	}

	getCurrentLocaleLabel(): I18nLocale {
		const dummyLocale = {
			id: this.locale,
			label: `Dummy`
		};
		if (environment.appI18nIsLocaleLanding) {
			return this.locales.find(
				(locale) => locale.id === this.locale
			) as I18nLocale;
		}
		if (
			this.locale === environment.appI18nLocaleDummy ||
			environment.appI18nIsLocaleDummy
		) {
			return dummyLocale;
		}
		const foundLocale = this.locales.find(
			(locale) => locale.id === this.locale
		);
		if (typeof foundLocale !== `undefined` && foundLocale !== null) {
			return foundLocale;
		}

		return dummyLocale;
	}

	getSupportedLocales(): Array<I18nLocale> {
		return this.locales.filter((locale) => locale.id !== this.locale);
	}

	isLocaleDummy(): boolean {
		return this.i18nSwitcherService.isLocaleDummy();
	}

	isSingleLocale(): boolean {
		return this.i18nSwitcherService.isSingleLocale();
	}
}
