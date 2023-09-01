import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ControllersRoutingModule } from './controllers-routing.module';
import { ControllersComponent } from './controllers.component';


@NgModule({
  declarations: [
    ControllersComponent
  ],
  imports: [
    CommonModule,
    ControllersRoutingModule
  ]
})
export class ControllersModule { }
