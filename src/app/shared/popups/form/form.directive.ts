import {Directive, EventEmitter, HostListener, Input, Output} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {FilesUploadComponent} from "../files-upload/files-upload.component";
import {FormComponent} from "./form.component";

@Directive({
	selector: '[appForm]'
})
export class FormDirective {
	@Input() multiple!: boolean;
	@Input() crop!: boolean;
	@Output() changed = new EventEmitter<string | string[]>();

	constructor(private dialog: MatDialog) {
	}

	@HostListener('click', ['event']) onclick() {
		this.openDialog();
	}

	private openDialog = (): void => {
		const dialogRef = this.dialog.open(
			FormComponent, {
				width: '50em',
				height: '30em'
			}
		);

		dialogRef.afterClosed().subscribe(result => {
			this.changed.emit(result || null);
		});
	}

	private closeDialog = ():void => {
		this.dialog.closeAll();
	}
}
