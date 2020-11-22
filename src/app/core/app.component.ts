import { Component, OnInit } from '@angular/core';
import { I18nSwitcherService } from '../../i18n/service/switcher/i18n.switcher.service';
import { Title } from '@angular/platform-browser';

@Component({
	selector: `app-root`,
	templateUrl: `./app.component.html`,
	styleUrls: [`./app.component.scss`]
})
export class AppComponent implements OnInit {
	// eslint-disable-next-line no-unused-vars
	constructor(
		// eslint-disable-next-line no-unused-vars
		public i18nSwitcherService: I18nSwitcherService,
		// eslint-disable-next-line no-unused-vars
		private titleService: Title
	) {
		this.setTitle();
	}

	public setTitle(): AppComponent {
		this.titleService.setTitle($localize`app.index.title`);
		return this;
	}

	ngOnInit(): void {
		this.i18nSwitcherService.init();
	}
}
