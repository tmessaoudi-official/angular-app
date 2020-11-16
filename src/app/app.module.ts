import {Title} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './core/app.component';
import {CoreModule} from './core/core.module';

@NgModule({
  declarations: [],
  imports: [
    CoreModule,
    AppRoutingModule,
  ],
  providers: [
    Title
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
