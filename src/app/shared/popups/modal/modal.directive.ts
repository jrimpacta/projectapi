import {Directive, EventEmitter, HostListener, Input, Output} from '@angular/core';
import {ModalComponent} from "./modal.component";
import {MatDialog} from "@angular/material/dialog";

@Directive({
	selector: '[appModal]'
})
export class ModalDirective {
	@Input() multiple!: boolean;
	@Input() crop!: boolean;
	@Output() changed = new EventEmitter<string | string[]>();

	@Input() routePdf!: string;

	constructor(private dialog: MatDialog) {
	}
	@HostListener('click', ['event']) onclick() {
		this.openDialog();
	}

	private openDialog = (): void => {
		const dialogRef = this.dialog.open(
			ModalComponent, {
				width: '65em',
				height: '95%'
				//data: {name: this.routePdf}
			},
		);

		dialogRef.afterClosed().subscribe(result => {
			this.changed.emit(result || null);
		});
	}
}
