import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
	selector: `app-dummy`,
	templateUrl: `./dummy.component.html`,
	styleUrls: [`./dummy.component.scss`]
})
export class DummyComponent implements OnInit {
	// eslint-disable-next-line no-unused-vars
	constructor(@Inject(ActivatedRoute) private route: ActivatedRoute) {}

	ngOnInit(): void {
		this.route.queryParams.subscribe((params) => {
			console.log(params);
		});
	}
}
