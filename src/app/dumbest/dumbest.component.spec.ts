import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DumbestComponent } from './dumbest.component';

describe(`DumbestComponent`, () => {
	let component: DumbestComponent;
	let fixture: ComponentFixture<DumbestComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [DumbestComponent]
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(DumbestComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it(`should create`, () => {
		expect(component).toBeTruthy();
	});
});
