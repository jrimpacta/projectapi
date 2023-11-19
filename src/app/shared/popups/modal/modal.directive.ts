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
	@Input() id!: number;
	@Input() routePdf!: string;

	constructor(private dialog: MatDialog) {}
	@HostListener('click', ['$event'])
	onclick(event: Event) {
		this.openDialog();
		event.preventDefault();
	}

	private openDialog = (): void => {
		const dialogRef = this.dialog.open(
			ModalComponent, {
				width: '65em',
				height: '95%',
				data: {
					id: this.id,
					multiple: this.multiple,
					crop: this.crop,
					routePdf: this.routePdf
				}
			},
		);

		dialogRef.afterClosed().subscribe(result => {
			this.changed.emit(result || null);
		});
	}
}
