import { TestBed } from '@angular/core/testing';

import { NgbModalService } from '../../../../../../src/app/core/service/ngb-modal.service';

describe(`NgbModalService`, () => {
	let service: NgbModalService;

	beforeEach(() => {
		TestBed.configureTestingModule({});
		service = TestBed.inject(NgbModalService);
	});

	it(`should be created`, () => {
		expect(service).toBeTruthy();
	});
});
