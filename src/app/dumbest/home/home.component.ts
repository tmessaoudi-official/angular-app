import {
	Component,
	ElementRef,
	Inject,
	LOCALE_ID,
	ViewChild
} from '@angular/core';
import { I18nSwitcherService } from '../../../i18n/service/switcher/i18n.switcher.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from '../../core/service/toastr.service';
import { PopperService } from '../../core/service/popper.service';

@Component({
	selector: `app-home`,
	templateUrl: `./home.component.html`,
	styleUrls: [`./home.component.scss`]
})
export class HomeComponent {
	minutes: number;
	gender: string;
	closeResult: string | undefined;
	popoverShow = false;
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
		private modalService: NgbModal,
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

	setGender(): void {
		if (this.gender === `male`) {
			this.gender = `female`;
		} else {
			this.gender = `male`;
		}
		localStorage.setItem(`gender`, this.gender);
	}

	setMinutes(operation: string = `+`): void {
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
	}

	toggleTooltip() {
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
	}
	toggleTooltip2() {
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
	}

	toggleModal(content: any) {
		this.modalService
			.open(content, { ariaLabelledBy: `modal-basic-title` })
			.result.then(
				(result) => {
					this.closeResult = `Closed with: ${result}`;
				},
				(reason) => {
					this.closeResult = `Dismissed ${this.getDismissReason(
						reason
					)}`;
				}
			);
	}

	private getDismissReason(reason: any): string {
		if (reason === ModalDismissReasons.ESC) {
			return `by pressing ESC`;
		} else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
			return `by clicking on a backdrop`;
		} else {
			return `with: ${reason}`;
		}
	}

	showSuccess() {
		this.toastr.show(`success`, `Toastr fun!`, `Hello world!`, {
			closeButton: true,
			positionClass: `toast-top-right`
		});
	}
}
