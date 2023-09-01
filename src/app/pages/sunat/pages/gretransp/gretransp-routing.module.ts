import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {GretranspComponent} from "./gretransp.component";

const routes: Routes = [
	{
		path: "",
		component: GretranspComponent
	}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GretranspRoutingModule { }
