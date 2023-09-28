import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FilesUploadModule} from "./files-upload/files-upload.module";
import {FormModule} from "./form/form.module";
import {ModalModule} from "./modal/modal.module";


@NgModule({
	declarations: [],
	imports: [
		CommonModule,
		FilesUploadModule,
		FormModule,
		ModalModule
	],
	exports: [
		FilesUploadModule,
		FormModule,
		ModalModule
	]
})
export class PopupsModule {
}
