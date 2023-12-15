import {Component, Inject} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

//[mat-dialog-close]="true"
@Component({
	selector: 'app-confirmation-dialog',
	template: `
    <h2 mat-dialog-title>{{ data.title }}</h2>
    <div mat-dialog-content>{{ data.message }}</div>
    <div mat-dialog-actions>
      <button mat-button (click)="onNoClick()">Cancelar</button>
      <button mat-button>Confirmar</button>
    </div>
  `,
})
export class ConfirmationDialogComponent {
	constructor(
		public dialogRef: MatDialogRef<ConfirmationDialogComponent>,
		@Inject(MAT_DIALOG_DATA) public data: { title: string; message: string }
	) {}

	onNoClick(): void {
		this.dialogRef.close();
	}
}
