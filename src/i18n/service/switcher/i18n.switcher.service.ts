import { Inject, Injectable, LOCALE_ID } from '@angular/core';
import { environment } from '../../../environments/environment';
import { LoggerService } from '../../../app/service/logger.service';

@Injectable({
	providedIn: `root`
})
export class I18nSwitcherService {
	public locales: Array<I18nLocale>;

	constructor(
		// eslint-disable-next-line no-unused-vars
		@Inject(LOCALE_ID) public locale: string,
		// eslint-disable-next-line no-unused-vars
		@Inject(LoggerService) public loggerService: LoggerService
	) {
		this.locales = environment.appI18nSupportedLocales as I18nLocale[];
	}

	switch(locale: string = ``): void {
		localStorage.setItem(`locale`, locale);
		if (locale === ``) {
			window.location.href = `/${window.location.hash}`;
		} else {
			window.location.href = `/${locale}/${window.location.hash}`;
		}
	}
	isSingleLocale(): boolean {
		return environment.appI18nSingleLocale;
	}
	isLocaleDummy(): boolean {
		let pathLocale = ``;
		if (environment.appI18nSwitcherCheckPathLocale) {
			const splittedPathname = window.location.pathname.split(`/`);
			if (splittedPathname[splittedPathname.length - 1] !== ``) {
				pathLocale = splittedPathname[splittedPathname.length - 1];
			} else if (splittedPathname[splittedPathname.length - 2] !== ``) {
				pathLocale = splittedPathname[splittedPathname.length - 2];
			}
		}
		return (
			pathLocale === environment.appI18nLocaleDummy ||
			this.locale === environment.appI18nLocaleDummy ||
			environment.appI18nIsLocaleDummy ||
			!this.locales.find((locale) => locale.id === this.locale)
		);
	}
	init(): void {
		if (environment.appI18nSwitcherBehaviour === `disabled`) {
			return;
		}
		if (environment.appI18nSwitcherBehaviour === `/`) {
			if (window.location.href !== `/`) {
				this.switch();
			}
		} else if (environment.appI18nSwitcherBehaviour === `default`) {
			if (this.isLocaleDummy()) {
				let targetLocale = ``;
				if (!localStorage.getItem(`locale`)) {
					localStorage.setItem(
						`locale`,
						environment.appI18nLocaleDefault as string
					);
					targetLocale = environment.appI18nLocaleDefault as string;
				} else {
					targetLocale = localStorage.getItem(`locale`) as string;
				}
				this.switch(targetLocale);
			} else {
				localStorage.setItem(`locale`, this.locale);
			}
		}
	}
}
