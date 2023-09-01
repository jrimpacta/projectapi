import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormComponent} from './form.component';
import {MatDialogModule} from "@angular/material/dialog";
import {FormDirective} from './form.directive';
import {AutocompleteModule, FormFieldModule, InputModule} from "../../controls";
import {ReactiveFormsModule} from "@angular/forms";
import {ButtonModule} from "../../buttons";


@NgModule({
	declarations: [
		FormComponent,
		FormDirective
	],
    imports: [
        CommonModule,
        MatDialogModule,
        FormFieldModule,
        InputModule,
        ReactiveFormsModule,
        ButtonModule,
        AutocompleteModule
    ],
	exports: [
		FormDirective
	]
})
export class FormModule {
}
