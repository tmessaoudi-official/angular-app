import { TestBed } from '@angular/core/testing';

import { LoggerService } from '../../../../../src/app/service/logger.service';

describe(`LoggerService`, () => {
	let service: LoggerService;

	beforeEach(() => {
		TestBed.configureTestingModule({});
		service = TestBed.inject(LoggerService);
	});

	it(`should be created`, () => {
		expect(service).toBeTruthy();
	});
});
