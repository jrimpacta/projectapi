import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DemoComponent } from './demo.component';

const routes: Routes = [
	{
		path:"",
		component:DemoComponent,
		children:[
			{
				path:"controllers",
				loadChildren: () =>
					import("./pages/controllers/controllers.module")
						.then(m => m.ControllersModule)
			},
			{
				path: "shared",
				loadChildren: () =>
					import("./pages/shared/shared.module")
						.then(m => m.SharedModule)
			}
		]
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class DemoRoutingModule {}
