import { TestBed } from '@angular/core/testing';

import { LocaleInitializerService } from '../../../../../src/i18n/service/locale-initializer.service';

describe(`LocaleInitializerService`, () => {
	let service: LocaleInitializerService;

	beforeEach(() => {
		TestBed.configureTestingModule({});
		service = TestBed.inject(LocaleInitializerService);
	});

	it(`should be created`, () => {
		expect(service).toBeTruthy();
	});
});
