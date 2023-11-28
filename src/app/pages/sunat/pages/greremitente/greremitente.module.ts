import {NgModule} from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';

import {GreremitenteRoutingModule} from './greremitente-routing.module';
import {GreremitenteComponent} from './greremitente.component';
import {ReactiveFormsModule} from "@angular/forms";
import {ButtonsModule, ControlsModule, IndicatorsModule, PopupsModule} from "src/app/shared";
import {MatGridListModule} from "@angular/material/grid-list";
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatChipsModule} from "@angular/material/chips";
import {MatIconModule} from "@angular/material/icon";
import {SunatModule} from "../../sunat.module";


@NgModule({
	declarations: [
		GreremitenteComponent
	],
	imports: [
		CommonModule,
		GreremitenteRoutingModule,
		ButtonsModule,
		ControlsModule,
		ReactiveFormsModule,
		IndicatorsModule,
		MatGridListModule,
		MatFormFieldModule,
		MatInputModule,
		MatChipsModule,
		MatIconModule,
		PopupsModule,
		SunatModule,
		NgOptimizedImage
	]
})
export class GreremitenteModule {
}
