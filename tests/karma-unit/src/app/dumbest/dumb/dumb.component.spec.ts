import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DumbComponent } from '../../../../../../src/app/dumbest/dumb/dumb.component';

describe(`DumbComponent`, () => {
	let component: DumbComponent;
	let fixture: ComponentFixture<DumbComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [DumbComponent],
			imports: [RouterTestingModule, HttpClientTestingModule]
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(DumbComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it(`should create`, () => {
		expect(component).toBeTruthy();
	});
});
