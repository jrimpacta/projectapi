import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {SigninallRoutingModule} from './signinall-routing.module';
import {ButttonProvidersComponent} from "../components/buttton-providers/buttton-providers.component";


@NgModule({
	declarations: [
	],
	imports: [
		CommonModule,
		SigninallRoutingModule,
	  	ButttonProvidersComponent
	]
})
export class SigninallModule {
}
