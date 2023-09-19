import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {SunatRoutingModule} from './sunat-routing.module';
import {SunatComponent} from './sunat.component';
import {MatIconModule} from "@angular/material/icon";
import {MatTableModule} from '@angular/material/table';

@NgModule({
    declarations: [
        SunatComponent
    ],
    imports: [
        CommonModule,
        SunatRoutingModule,
        MatIconModule,
        MatTableModule
    ]
})
export class SunatModule {
}
