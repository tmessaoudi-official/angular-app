import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
	selector: `app-dumb`,
	templateUrl: `./dumb.component.html`,
	styleUrls: [`./dumb.component.scss`]
})
export class DumbComponent implements OnInit {
	// eslint-disable-next-line no-unused-vars
	constructor(@Inject(ActivatedRoute) private route: ActivatedRoute) {}

	ngOnInit(): void {
		this.route.queryParams.subscribe((params) => {
			console.log(params);
		});
	}
}
