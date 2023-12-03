import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {SigninallComponent} from "./signinall.component";

const routes: Routes = [
	{
		path: '',
		component: SigninallComponent
	}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SigninallRoutingModule { }
