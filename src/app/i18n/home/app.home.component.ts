import { Component, OnInit } from '@angular/core';
import { I18nSwitcherService } from '../../../i18n/service/switcher/i18n.switcher.service';
import { Title } from '@angular/platform-browser';

@Component({
	selector: `app-root`,
	templateUrl: `./app.home.component.html`,
	styleUrls: [`./app.home.component.scss`]
})
export class AppHomeComponent implements OnInit {
	constructor(
		// eslint-disable-next-line no-unused-vars
		public i18nSwitcherService: I18nSwitcherService,
		// eslint-disable-next-line no-unused-vars
		private titleService: Title
	) {
		this.setTitle();
	}

	public setTitle(): AppHomeComponent {
		this.titleService.setTitle($localize`app.index.title`);
		return this;
	}

	ngOnInit(): void {
		this.i18nSwitcherService.init();
	}
}
