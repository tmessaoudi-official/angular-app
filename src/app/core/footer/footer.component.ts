import { Component } from '@angular/core';

@Component({
	selector: `app-footer`,
	templateUrl: `./footer.component.html`,
	styleUrls: [`./footer.component.scss`]
})
export class FooterComponent {
	name = `Developer`;
	footerText: string = $localize`app.footer.text ${this.name}`;
}
