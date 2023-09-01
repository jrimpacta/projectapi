import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SunatRoutingModule } from './sunat-routing.module';
import { SunatComponent } from './sunat.component';
import {MatIconModule} from "@angular/material/icon";

@NgModule({
  declarations: [
    SunatComponent
  ],
    imports: [
        CommonModule,
        SunatRoutingModule,
        MatIconModule
    ]
})
export class SunatModule { }
