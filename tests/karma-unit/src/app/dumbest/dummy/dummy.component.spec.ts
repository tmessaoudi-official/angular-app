import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DummyComponent } from '../../../../../../src/app/dumbest/dummy/dummy.component';

describe(`DummyComponent`, () => {
	let component: DummyComponent;
	let fixture: ComponentFixture<DummyComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [DummyComponent],
			imports: [RouterTestingModule, HttpClientTestingModule]
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(DummyComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it(`should create`, () => {
		expect(component).toBeTruthy();
	});
});
