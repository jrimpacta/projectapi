import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {SigninimpactaComponent} from "./signinimpacta.component";

const routes: Routes = [
	{
		path: '',
		component: SigninimpactaComponent
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class SigninimpactaRoutingModule { }
