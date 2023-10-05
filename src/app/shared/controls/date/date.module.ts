import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DateComponent } from './date.component';
import { MatDatepickerModule } from "@angular/material/datepicker";
import {MatInputModule} from "@angular/material/input";

@NgModule({
	declarations: [
		DateComponent
	],
    imports: [
        CommonModule,
        MatDatepickerModule,
        MatInputModule
    ],
	exports: [
		DateComponent
	]
})
export class DateModule {
}
