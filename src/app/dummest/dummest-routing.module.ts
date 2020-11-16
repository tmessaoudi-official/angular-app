import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {DumbComponent} from './dumb/dumb.component';
import {DummyComponent} from './dummy/dummy.component';
import {DumberComponent} from './dumber/dumber.component';
import {HomeComponent} from './home/home.component';

const routes: Routes = [
  {path: 'dumb', component: DumbComponent},
  {path: 'dummy', component: DummyComponent},
  {path: 'dumber/:id', component: DumberComponent},
  {path: 'dumber', component: DumberComponent},
  {path: '', component: HomeComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DummestRoutingModule { }
