import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DumbestRoutingModule } from './dumbest-routing.module';
import { DumbestComponent } from './dumbest.component';

import { DummyComponent } from './dummy/dummy.component';
import { DumbComponent } from './dumb/dumb.component';
import { DumberComponent } from './dumber/dumber.component';
import { HomeComponent } from './home/home.component';

@NgModule({
	declarations: [
		DumbestComponent,
		DummyComponent,
		DumbComponent,
		DumberComponent,
		HomeComponent
	],
	imports: [CommonModule, DumbestRoutingModule]
})
export class DumbestModule {}
