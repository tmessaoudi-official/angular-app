import { TestBed } from '@angular/core/testing';

import { CryptoService } from '../../../../../../src/app/core/service/crypto.service';

describe(`CryptoService`, () => {
	let service: CryptoService;

	beforeEach(() => {
		TestBed.configureTestingModule({});
		service = TestBed.inject(CryptoService);
	});

	it(`should be created`, () => {
		expect(service).toBeTruthy();
	});
});
