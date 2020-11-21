import { TestBed } from '@angular/core/testing';

import { I18nSwitcherService } from '../../../../../../src/i18n/service/switcher/i18n.switcher.service';

describe(`I18nSwitcherService`, () => {
	let service: I18nSwitcherService;

	beforeEach(() => {
		TestBed.configureTestingModule({});
		service = TestBed.inject(I18nSwitcherService);
	});

	it(`should be created`, () => {
		expect(service).toBeTruthy();
	});
});
