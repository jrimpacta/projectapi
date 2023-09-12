import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NotificationComponent } from './components';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { firstValueFrom } from "rxjs";

@Injectable()
export class NotificationService {
	constructor(private snackBar: MatSnackBar, public http: HttpClient) {
	}

	error = (message: string): void => {
		this.snackBar.openFromComponent(NotificationComponent, {
			duration: 8000,
			data: { message },
			//panelClass: ['mat-snackbar_error'] // Por arreglar
		});
	}

	success = (message: string): void => {
		this.snackBar.openFromComponent(NotificationComponent, {
			duration: 6000,
			data: { message },
			//panelClass: ["mat-snackbar_success"]
		});
	}
}
