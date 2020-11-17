import { TestBed } from '@angular/core/testing';

import { EnvironmentVariableHandler } from './environment-variable-handler';

describe(`EnvironmentVariableHandler`, () => {
	let service: EnvironmentVariableHandler;

	beforeEach(() => {
		TestBed.configureTestingModule({});
		service = TestBed.inject(EnvironmentVariableHandler);
	});

	it(`should be created`, () => {
		expect(service).toBeTruthy();
	});
});
