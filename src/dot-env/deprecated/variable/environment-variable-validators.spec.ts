import { TestBed } from '@angular/core/testing';

import { EnvironmentVariableValidators } from './environment-variable-validators';

describe(`EnvironmentVariableValidators`, () => {
	let service: EnvironmentVariableValidators;

	beforeEach(() => {
		TestBed.configureTestingModule({});
		service = TestBed.inject(EnvironmentVariableValidators);
	});

	it(`should be created`, () => {
		expect(service).toBeTruthy();
	});
});
