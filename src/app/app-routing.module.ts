import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './core/not-found/not-found.component';

const routes: Routes = [
	{
		path: `404`,
		component: NotFoundComponent
	},
	{
		path: `dummest`,
		loadChildren: () =>
			import(`./dummest/dummest.module`).then((m) => m.DummestModule)
	},
	{
		path: ``,
		redirectTo: `dummest`,
		pathMatch: `full`
	},
	// otherwise redirect to home
	{
		path: `**`,
		redirectTo: `404`
	}
];

@NgModule({
	imports: [
		RouterModule.forRoot(routes, {
			useHash: true,
			relativeLinkResolution: `corrected`,
			preloadingStrategy: PreloadAllModules,
			scrollPositionRestoration: `enabled`,
			onSameUrlNavigation: `reload`
		})
	],
	exports: [RouterModule]
})
export class AppRoutingModule {}
