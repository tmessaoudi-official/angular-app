import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DummestRoutingModule } from './dummest-routing.module';
import { DummestComponent } from './dummest.component';

import { DummyComponent } from './dummy/dummy.component';
import { DumbComponent } from './dumb/dumb.component';
import { DumberComponent } from './dumber/dumber.component';
import { HomeComponent } from './home/home.component';

@NgModule({
	declarations: [
		DummestComponent,
		DummyComponent,
		DumbComponent,
		DumberComponent,
		HomeComponent
	],
	imports: [CommonModule, DummestRoutingModule]
})
export class DummestModule {}
