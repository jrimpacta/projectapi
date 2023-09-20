import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {SunatRoutingModule} from './sunat-routing.module';
import {SunatComponent} from './sunat.component';
import {MatIconModule} from "@angular/material/icon";
import {MatTableModule} from '@angular/material/table';
import {MatTooltipModule} from "@angular/material/tooltip";
import {MatFormFieldModule} from "@angular/material/form-field";

@NgModule({
    declarations: [
        SunatComponent
    ],
    imports: [
        CommonModule,
        SunatRoutingModule,
        MatIconModule,
        MatTableModule
    ], exports: [
		CommonModule,
		MatIconModule,
		MatTableModule,
		MatTooltipModule,
		MatFormFieldModule,
	]
})
export class SunatModule {
}
