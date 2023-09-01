import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FilesUploadModule} from "./files-upload/files-upload.module";
import {FormModule} from "./form/form.module";


@NgModule({
	declarations: [],
	imports: [
		CommonModule,
		FilesUploadModule,
		FormModule
	],
	exports: [
		FilesUploadModule,
		FormModule
	]
})
export class PopupsModule {
}
