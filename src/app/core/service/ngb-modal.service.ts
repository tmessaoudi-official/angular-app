import { Injectable, TemplateRef, ElementRef } from '@angular/core';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';

@Injectable({
	providedIn: `root`
})
export class NgbModalService {
	constructor(
		// eslint-disable-next-line no-unused-vars
		private modalService: NgbModal
	) {}

	toggleModal(
		content: TemplateRef<ElementRef>,
		options: NgbModalOptions,
		terminatedCallBack?: (
			// eslint-disable-next-line no-unused-vars
			type: `closed` | `dissmissed`,
			// eslint-disable-next-line no-unused-vars
			how: string | number
		) => void
	) {
		this.modalService.open(content, options).result.then(
			(result: string | number) => {
				if (typeof terminatedCallBack === `function`) {
					terminatedCallBack(`closed`, result);
				}
			},
			(reason: string | number) => {
				if (typeof terminatedCallBack === `function`) {
					terminatedCallBack(`dissmissed`, reason);
				}
			}
		);
	}
}
