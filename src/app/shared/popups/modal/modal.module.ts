import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatDialogModule} from "@angular/material/dialog";
import {ModalComponent} from "./modal.component";
import {ModalDirective} from "./modal.directive";


@NgModule({
	declarations: [
		ModalComponent,
		ModalDirective
	],
	imports: [
		CommonModule,
		MatDialogModule
	],
	exports: [
		ModalDirective
	]
})
export class ModalModule {
}
