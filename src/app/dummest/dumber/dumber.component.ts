import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
	selector: `app-dumber`,
	templateUrl: `./dumber.component.html`,
	styleUrls: [`./dumber.component.scss`]
})
export class DumberComponent implements OnInit {
	// eslint-disable-next-line no-unused-vars
	constructor(@Inject(ActivatedRoute) private route: ActivatedRoute) {}

	ngOnInit(): void {
		this.route.queryParams.subscribe((params) => {
			console.log(params);
		});
		this.route.params.subscribe((params) => {
			console.log(params);
		});
	}
}
