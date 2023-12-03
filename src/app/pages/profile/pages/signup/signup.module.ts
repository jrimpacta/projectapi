import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {SignupRoutingModule} from './signup-routing.module';
import {ControlsModule, IndicatorsModule, PopupsModule} from "../../../../shared";
import {ReactiveFormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatIconModule} from "@angular/material/icon";
import {ButttonProvidersComponent} from "../components/buttton-providers/buttton-providers.component";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {SignupComponent} from "./signup.component";


@NgModule({
	declarations: [
		SignupComponent
	],
	imports: [
		CommonModule,
		SignupRoutingModule,
		ControlsModule,
		ReactiveFormsModule,
		IndicatorsModule,
		PopupsModule,
		MatFormFieldModule,
		MatIconModule,
		ButttonProvidersComponent,
		MatSnackBarModule,
		MatInputModule,
		MatButtonModule
	]
})
export class SignupModule {
}
