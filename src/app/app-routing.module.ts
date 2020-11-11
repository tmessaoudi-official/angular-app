import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {DumbComponent} from './dumb/dumb.component';
import {DummyComponent} from './dummy/dummy.component';
import {DumberComponent} from './dumber/dumber.component';
import {HomeComponent} from './home/home.component';
import {NotFoundComponent} from './not-found/not-found.component';

const routes: Routes = [
  { path: 'dumb', component: DumbComponent },
  { path: 'dummy', component: DummyComponent },
  { path: 'dumber/:id', component: DumberComponent },
  { path: 'dumber', component: DumberComponent },
  { path: '', component: HomeComponent },

  { path: '404', component: NotFoundComponent },
  // otherwise redirect to home
  // { path: '**', redirectTo: '404' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
