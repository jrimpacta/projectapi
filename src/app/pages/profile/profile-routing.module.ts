import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
	{
		path: 'new',
		loadChildren: () => import('./pages/form/form.module').then(m => m.FormModule)
	}, {
		path: 'edit',
		loadChildren: () => import('./pages/form/form.module').then(m => m.FormModule)
	}, {
		path: 'id',
		loadChildren: () => import('./pages/display/display.module').then(m => m.DisplayModule)
	}, {
		path: 'signinsgi',
		loadChildren: () => import('./pages/signin/signin.module').then(m => m.SigninModule)
	}, {
		path: 'signinall',
		loadChildren: () => import('./pages/signinall/signinall.module').then(m => m.SigninallModule)
	}, {
		path: 'signup',
		loadChildren: () => import('./pages/signup/signup.module').then(m => m.SignupModule)
	}, {
		path: 'signin',
		loadChildren: () => import('./pages/signinimpacta/signinimpacta.module').then(m => m.SigninimpactaModule)
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class ProfileRoutingModule {
}
