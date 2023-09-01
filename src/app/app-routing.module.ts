import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
	{
		path: "",
		children: [
			{
				path: 'demo',
				loadChildren: () => import('./pages/demo/demo.module')
					.then(m => m.DemoModule)
			}, {
				path: 'sunat',
				loadChildren: () => import('./pages/sunat/sunat.module')
					.then(m => m.SunatModule)
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
