import { TestBed } from '@angular/core/testing';

import { I18nLocaleService } from '../../../../../src/i18n/service/i18n.locale.service';

describe(`LocaleService`, () => {
	let service: I18nLocaleService;

	beforeEach(() => {
		TestBed.configureTestingModule({});
		service = TestBed.inject(I18nLocaleService);
	});

	it(`should be created`, () => {
		expect(service).toBeTruthy();
	});
});
