import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {loginGuard} from "./guards/login.guard";

const routes: Routes = [
	{
		path: "",
		children: [
			{
				path: '',
				loadChildren: () => import('./pages/sunat/sunat.module')
					.then(m => m.SunatModule),
				canActivate: [loginGuard]
			}, {
				path: 'demo',
				loadChildren: () => import('./pages/demo/demo.module')
					.then(m => m.DemoModule)
			}, {
				path: 'sunat',
				loadChildren: () => import('./pages/sunat/sunat.module')
					.then(m => m.SunatModule)
			}, {
				path: 'profile',
				loadChildren: () => import('./pages/profile/profile.module')
					.then(m => m.ProfileModule)
			}
		]
	}
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule {
}
