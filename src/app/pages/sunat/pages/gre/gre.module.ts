import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {GreRoutingModule} from './gre-routing.module';
import {GreComponent} from './gre.component';
import {ConductorComponent} from './components/conductor/conductor.component';
import {VehiculoComponent} from './components/vehiculo/vehiculo.component';


@NgModule({
	declarations: [
		GreComponent,
		ConductorComponent,
		VehiculoComponent
	],
	imports: [
		CommonModule,
		GreRoutingModule
	],
	exports: [
		ConductorComponent,
		VehiculoComponent
	]
})
export class GreModule {
}
