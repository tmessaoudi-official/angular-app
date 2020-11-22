import { Injectable } from '@angular/core';
import { ToastrService as OriginalToastrService } from 'ngx-toastr';
import { IndividualConfig } from 'ngx-toastr/toastr/toastr-config';

@Injectable({
	providedIn: `root`
})
export class ToastrService {
	constructor(
		// eslint-disable-next-line no-unused-vars
		private toastr: OriginalToastrService
	) {}

	show(
		type: string,
		message: string,
		title: string,
		overrides: Partial<IndividualConfig>
	) {
		this.toastr.show(message, title, overrides, type);
	}
}
