import {
	Component,
	ElementRef,
	Inject,
	LOCALE_ID,
	ViewChild,
	TemplateRef
} from '@angular/core';
import { I18nSwitcherService } from '../../../i18n/service/switcher/i18n.switcher.service';
import { ToastrService } from '../../core/service/toastr.service';
import { PopperService } from '../../core/service/popper.service';
import { NgbModalService } from '../../core/service/ngb-modal.service';

@Component({
	selector: `app-home`,
	templateUrl: `./home.component.html`,
	styleUrls: [`./home.component.scss`]
})
export class HomeComponent {
	minutes: number;
	gender: string;
	popoverShow = false;
	modalTitle = `hello modal`;
	@ViewChild(`popoverRef`, { static: false }) popoverRef:
		| ElementRef
		| undefined;
	@ViewChild(`popoverRef2`, { static: false }) popoverRef2:
		| ElementRef
		| undefined;

	constructor(
		// eslint-disable-next-line no-unused-vars
		@Inject(LOCALE_ID) public locale: string,
		// eslint-disable-next-line no-unused-vars
		public i18nSwitcherService: I18nSwitcherService,
		// eslint-disable-next-line no-unused-vars
		private ngbModal: NgbModalService,
		// eslint-disable-next-line no-unused-vars
		private popper: PopperService,
		// eslint-disable-next-line no-unused-vars
		private toastr: ToastrService
	) {
		this.minutes = this.getMinutes();
		this.gender = this.getGender();
	}

	getMinutes(): number {
		const minutes = parseInt(<string>localStorage.getItem(`minutes`), 10);
		if (isNaN(minutes)) {
			return 0;
		}
		return minutes;
	}

	getGender(): string {
		const gender = localStorage.getItem(`gender`);

		if (gender === `` || gender === undefined || gender === null) {
			return `male`;
		}
		return gender;
	}

	setGender(): HomeComponent {
		if (this.gender === `male`) {
			this.gender = `female`;
		} else {
			this.gender = `male`;
		}
		localStorage.setItem(`gender`, this.gender);
		return this;
	}

	setMinutes(operation: string = `+`): HomeComponent {
		switch (operation) {
			case `+`: {
				this.minutes++;
				break;
			}
			case `-`: {
				if (this.minutes > 0) {
					this.minutes--;
				} else {
					// @ts-ignore : i have a probleme with the ide but it exists !!
					alert($localize`can t set minutes less than 0`);
				}
				break;
			}
			default: {
				this.minutes++;
				break;
			}
		}
		localStorage.setItem(`minutes`, this.minutes.toString());
		return this;
	}

	toggleTooltip(): HomeComponent {
		if (this.popoverShow) {
			this.popoverShow = false;
			this.popper.destroyPopper();
		} else {
			this.popoverShow = true;
			this.popper.createPoppper(
				`<div
    class="bg-dark border-0 mt-3 block z-50 font-normal leading-normal text-sm max-w-xs text-left no-underline break-words rounded-lg">
        <div>
            <div
            class="bg-dark text-white opacity-75 font-semibold p-3 mb-0 border-b border-solid border-gray-200 uppercase rounded-t-lg">
                popover title
            </div>
            <div class="text-white p-3">
                popover message
            </div>
        </div>
    </div>`,
				{
					placement: `bottom-start`
				},
				this.popoverRef
			);
		}
		return this;
	}
	toggleTooltip2(): HomeComponent {
		if (this.popoverShow) {
			this.popoverShow = false;
			this.popper.destroyPopper();
		} else {
			this.popoverShow = true;
			this.popper.createPoppper(
				`<div
    class="bg-dark border-0 mt-3 block z-50 font-normal leading-normal text-sm max-w-xs text-left no-underline break-words rounded-lg">
        <div>
            <div
            class="bg-dark text-white opacity-75 font-semibold p-3 mb-0 border-b border-solid border-gray-200 uppercase rounded-t-lg">
                popover title 2
            </div>
            <div class="text-white p-3">
                popover message 2
            </div>
        </div>
    </div>`,
				{
					placement: `bottom-end`
				},
				this.popoverRef2
			);
		}
		return this;
	}

	toggleModal(content: TemplateRef<ElementRef>): HomeComponent {
		this.ngbModal.toggleModal(
			content,
			{
				ariaLabelledBy: `modal-basic-title`
				// eslint-disable-next-line no-unused-vars
			},
			(type, how) => {
				console.log(`type`);
				console.log(type);
				console.log(`how`);
				console.log(how);
			}
		);
		return this;
	}

	showSuccess(): HomeComponent {
		this.toastr.show(`success`, `Toastr fun!`, `Hello world!`, {
			closeButton: true,
			positionClass: `toast-top-right`
		});
		return this;
	}
}
