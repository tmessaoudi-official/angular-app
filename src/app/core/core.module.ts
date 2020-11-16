import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {HeaderComponent} from './header/header.component';
import {FooterComponent} from './footer/footer.component';
import {NotFoundComponent} from './not-found/not-found.component';
import {BrowserModule} from '@angular/platform-browser';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {CoreRoutingModule} from './core-routing.module';
import {AppComponent} from './app.component';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    NotFoundComponent,
    AppComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    NgbModule,
    CoreRoutingModule
  ]
})
export class CoreModule { }
