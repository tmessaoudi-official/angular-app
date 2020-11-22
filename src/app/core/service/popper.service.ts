import { Injectable, ElementRef } from '@angular/core';
import { createPopper as originalCreatePopper } from '@popperjs/core';
import { OptionsGeneric } from '@popperjs/core/lib/types';

@Injectable({
	providedIn: `root`
})
export class PopperService {
	popper = document.createElement(`div`);

	createdElement(content: string): PopperService {
		this.popper.innerHTML = content;
		return this;
	}

	destroyPopper(): PopperService {
		// @ts-ignore : this is not null, i created a div here @todo fix
		this.popper.parentNode.removeChild(this.popper);
		return this;
	}

	createPoppper(
		content: string,
		// @ts-ignore : type exists but i dont know from where !! @todo fix
		options: Partial<OptionsGeneric<TModifier>>,
		ref: ElementRef | undefined
	): PopperService {
		this.createdElement(content);
		// @ts-ignore : it is not undefined @todo fix
		originalCreatePopper(ref.nativeElement, this.popper, options);
		// @ts-ignore : it is not undefined @todo fix
		// eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
		ref.nativeElement.parentNode.insertBefore(
			this.popper,
			// @ts-ignore : it is not undefined @todo fix
			// eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
			ref.nativeElement.nextSibling
		);
		return this;
	}
}
