import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UbicacionComponent} from './ubicacion.component';
import {DepartamentoPipe} from './pipes/departamento.pipe';
import {SelectModule} from "../select/select.module";
import {DateModule} from "../date/date.module";
import {ReactiveFormsModule} from "@angular/forms";
import {FormFieldModule} from "../form-field/form-field.module";


@NgModule({
	declarations: [
		UbicacionComponent,
		DepartamentoPipe
	],
	imports: [
		CommonModule,
		SelectModule,
		DateModule,
		ReactiveFormsModule,
		FormFieldModule
	],
	exports: [
		UbicacionComponent
	]
})
export class UbicacionModule {
}
