import { TestBed } from '@angular/core/testing';

import { PopperService } from '../../../../../../src/app/core/service/popper.service';

describe(`PopperService`, () => {
	let service: PopperService;

	beforeEach(() => {
		TestBed.configureTestingModule({});
		service = TestBed.inject(PopperService);
	});

	it(`should be created`, () => {
		expect(service).toBeTruthy();
	});
});
