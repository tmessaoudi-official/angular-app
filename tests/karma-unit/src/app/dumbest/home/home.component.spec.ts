import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from '../../../../../../src/app/dumbest/home/home.component';
import { ToastrModule } from 'ngx-toastr';

describe(`HomeComponent`, () => {
	let component: HomeComponent;
	let fixture: ComponentFixture<HomeComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [HomeComponent],
			imports: [ToastrModule.forRoot()]
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(HomeComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it(`should create`, () => {
		expect(component).toBeTruthy();
	});
});
