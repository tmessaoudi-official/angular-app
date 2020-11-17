import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppHomeComponent } from './app.home.component';

@NgModule({
	declarations: [AppHomeComponent],
	imports: [BrowserModule],
	providers: [Title],
	bootstrap: [AppHomeComponent]
})
export class AppHomeModule {}
