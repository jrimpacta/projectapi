import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ListcpeRoutingModule} from './listcpe-routing.module';
import {ListcpeComponent} from './listcpe.component';
import {ButtonsModule, ControlsModule} from "../../../../shared";
import {ReactiveFormsModule} from "@angular/forms";
import {MatCardModule} from "@angular/material/card";
import {MatButtonModule} from "@angular/material/button";

@NgModule({
	declarations: [
		ListcpeComponent
	],
	imports: [
		CommonModule,
		ListcpeRoutingModule,
		ButtonsModule,
		ControlsModule,
		ReactiveFormsModule,
		MatCardModule,
		MatButtonModule
	]
})
export class ListcpeModule {
}
