import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CoreRoutingModule } from './core-routing.module';
import { AppComponent } from './app.component';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
	declarations: [
		HeaderComponent,
		FooterComponent,
		NotFoundComponent,
		AppComponent
	],
	imports: [
		CommonModule,
		BrowserModule,
		NgbModule,
		CoreRoutingModule,
		BrowserAnimationsModule,
		ToastrModule.forRoot()
	]
})
export class CoreModule {}
