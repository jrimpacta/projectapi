import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SigninRoutingModule } from './signin-routing.module';
import { ButtonsModule, ControlsModule, IndicatorsModule, PopupsModule } from "src/app/shared";
import { ReactiveFormsModule} from "@angular/forms";
import { SigninComponent } from "./signin.component";
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import {ButttonProvidersComponent} from "../components/buttton-providers/buttton-providers.component";
import { MatSnackBarModule } from '@angular/material/snack-bar';
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
@NgModule({
	declarations: [
		SigninComponent
	],
	imports: [
		CommonModule,
		SigninRoutingModule,
		ButtonsModule,
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
export class SigninModule {
}
