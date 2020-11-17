import { Component, Inject, LOCALE_ID } from '@angular/core';
import { I18nLocaleService } from '../../../i18n/service/i18n.locale.service';

@Component({
	selector: `app-header`,
	templateUrl: `./header.component.html`,
	styleUrls: [`./header.component.scss`]
})
export class HeaderComponent {
	isNavbarCollapsed: boolean;

	constructor(
		// eslint-disable-next-line no-unused-vars
		@Inject(LOCALE_ID) public locale: string,
		// eslint-disable-next-line no-unused-vars
		@Inject(I18nLocaleService) public i18nLocaleService: I18nLocaleService
	) {
		this.isNavbarCollapsed = true;
	}
}
