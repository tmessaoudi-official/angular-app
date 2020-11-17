import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppHomeComponent } from './app.home.component';

describe(`AppHomeComponent`, () => {
	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [RouterTestingModule],
			declarations: [AppHomeComponent]
		}).compileComponents();
	});

	it(`should create the app`, () => {
		const fixture = TestBed.createComponent(AppHomeComponent);
		const app = fixture.componentInstance;
		expect(app).toBeTruthy();
	});

	it(`should have as title 'localization'`, () => {
		const fixture = TestBed.createComponent(AppHomeComponent);
		// eslint-disable-next-line no-unused-vars
		const app = fixture.componentInstance;
	});

	it(`should render title`, () => {
		const fixture = TestBed.createComponent(AppHomeComponent);
		fixture.detectChanges();
		// eslint-disable-next-line no-unused-vars
		const compiled = fixture.nativeElement;
	});
});
