import { TestBed } from '@angular/core/testing';

import { ToastrService } from '../../../../../../src/app/core/service/toastr.service';
import { ToastrModule } from 'ngx-toastr';

describe(`ToastrService`, () => {
	let service: ToastrService;

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [ToastrModule.forRoot()]
		});
		service = TestBed.inject(ToastrService);
	});

	it(`should be created`, () => {
		expect(service).toBeTruthy();
	});
});
