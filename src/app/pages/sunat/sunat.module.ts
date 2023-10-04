import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {SunatRoutingModule} from './sunat-routing.module';
import {SunatComponent} from './sunat.component';
import {MatIconModule} from "@angular/material/icon";
import {MatTableModule} from '@angular/material/table';
import {MatTooltipModule} from "@angular/material/tooltip";
import {MatFormFieldModule} from "@angular/material/form-field";
import { ProductoComponent } from './items/producto/producto.component';
import {ProductoModule} from "./items/producto/producto.module";

@NgModule({
    declarations: [
        SunatComponent,
        ProductoComponent
    ],
    imports: [
        CommonModule,
        SunatRoutingModule,
        MatIconModule,
        MatTableModule,
		ProductoModule
    ], exports: [
		CommonModule,
		MatIconModule,
		MatTableModule,
		MatTooltipModule,
		MatFormFieldModule,
		ProductoModule,
		ProductoComponent
	]
})
export class SunatModule {
}
