import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FacturacionRoutingModule } from './facturacion-routing.module';
import { FacturacionComponent } from './facturacion.component';
import {MatIconModule} from "@angular/material/icon";
import {ModalModule} from "../../../shared";


@NgModule({
  declarations: [
    FacturacionComponent
  ],
    imports: [
        CommonModule,
        FacturacionRoutingModule,
        MatIconModule,
        ModalModule
    ]
})
export class FacturacionModule { }
