import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {GreComponent} from "./gre.component";

const routes: Routes = [
	{
		path: "",
		component: GreComponent
	}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GreRoutingModule { }
