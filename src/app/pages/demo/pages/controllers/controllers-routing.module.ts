import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ControllersComponent } from "./controllers.component";

const routes: Routes = [
	{
		path: "",
		component: ControllersComponent
	}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ControllersRoutingModule { }
