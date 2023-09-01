import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GretranspRoutingModule } from './gretransp-routing.module';
import { GretranspComponent } from './gretransp.component';


@NgModule({
  declarations: [
    GretranspComponent
  ],
  imports: [
    CommonModule,
    GretranspRoutingModule
  ]
})
export class GretranspModule { }
