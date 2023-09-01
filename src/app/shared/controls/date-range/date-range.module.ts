import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DateRangeComponent } from './date-range.component';
import { ReactiveFormsModule } from "@angular/forms";
import { ControlsModule } from "../controls.module";
import { DateModule } from "../date/date.module";


@NgModule({
	declarations: [
		DateRangeComponent
	],
	imports: [
		CommonModule,
		DateModule,
		ReactiveFormsModule
	],
	exports: [
		DateRangeComponent
	]
})
export class DateRangeModule {
}
