import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ButtonModule} from "./button/button.module";
import {ButtonComponent} from "./button/button.component";
import {BtnErrorModule} from "./btn-error/btn-error.module";
import {BtnErrorComponent} from "./btn-error/btn-error.component";

@NgModule({
	declarations: [],
	imports: [
		CommonModule,
		ButtonModule,
		BtnErrorModule
	], exports: [
		ButtonComponent,
		BtnErrorComponent
	]
})
export class ButtonsModule {
}
