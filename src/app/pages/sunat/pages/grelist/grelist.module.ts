import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {GrelistRoutingModule} from './grelist-routing.module';
import {GrelistComponent} from './grelist.component';
import {MatIconModule} from "@angular/material/icon";
import {MatTableModule} from '@angular/material/table';

@NgModule({
    declarations: [
        GrelistComponent
    ],
    imports: [
        CommonModule,
        GrelistRoutingModule,
        MatIconModule,
        MatTableModule
    ]
})
export class GrelistModule {
}
