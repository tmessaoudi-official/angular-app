import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppHomeComponent } from './app.home.component';

@NgModule({
  declarations: [
    AppHomeComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppHomeComponent]
})
export class AppHomeModule { }
