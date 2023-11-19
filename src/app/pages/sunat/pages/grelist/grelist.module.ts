import {LOCALE_ID, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {GrelistRoutingModule} from './grelist-routing.module';
import {GrelistComponent} from './grelist.component';
import {MatIconModule} from "@angular/material/icon";
import {MatTableModule} from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';

import es from '@angular/common/locales/es';
import { registerLocaleData } from '@angular/common';
import {MatButtonModule} from "@angular/material/button";
import {MatTooltipModule} from "@angular/material/tooltip";
import {MatSortModule} from "@angular/material/sort";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {ButtonsModule, ControlsModule, PopupsModule} from "../../../../shared";
import {ReactiveFormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import { MatDialogModule} from "@angular/material/dialog";

registerLocaleData(es);
@NgModule({
    declarations: [
        GrelistComponent
    ],
    imports: [
        CommonModule,
        GrelistRoutingModule,
        MatIconModule,
        MatTableModule,
		MatPaginatorModule,
		MatButtonModule,
		MatTooltipModule,
		MatSortModule,
		ButtonsModule,
		ControlsModule,
		ReactiveFormsModule,
		MatInputModule,
		PopupsModule,
		MatDialogModule
	],
	providers: [
		{
			provide: LOCALE_ID,
			useValue: 'es-PE'
		}
	]
})
export class GrelistModule {
}
