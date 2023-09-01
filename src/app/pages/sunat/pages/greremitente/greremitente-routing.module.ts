import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {GreremitenteComponent} from "./greremitente.component";

const routes: Routes = [
	{
		path: "",
		component: GreremitenteComponent
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class GreremitenteRoutingModule {
}
