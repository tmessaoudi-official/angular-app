import { Injectable, ElementRef } from '@angular/core';
import { createPopper as originalCreatePopper } from '@popperjs/core';
import { OptionsGeneric } from '@popperjs/core/lib/types';

@Injectable({
	providedIn: `root`
})
export class PopperService {
	popper = document.createElement(`div`);
	constructor() {}

	createdElement(content: string) {
		this.popper.innerHTML = content;
	}

	destroyPopper() {
		// @ts-ignore : this is not null, i created a div here
		this.popper.parentNode.removeChild(this.popper);
	}

	createPoppper(
		content: string,
		// @ts-ignore : type exists but i dont know from where !!
		options: Partial<OptionsGeneric<TModifier>>,
		ref: ElementRef | undefined
	) {
		this.createdElement(content);
		// @ts-ignore : this is not undefined, i have an element with this id in the view
		originalCreatePopper(ref.nativeElement, this.popper, options);
		// @ts-ignore : this is not undefined, i have an element with this id in the view
		ref.nativeElement.parentNode.insertBefore(
			this.popper,
			// @ts-ignore : this is not undefined, i have an element with this id in the view
			ref.nativeElement.nextSibling
		);
	}
}
