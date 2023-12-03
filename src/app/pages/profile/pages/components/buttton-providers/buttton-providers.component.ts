import { NgOptimizedImage } from '@angular/common';
import { Component, Input, inject } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from 'src/app/services';
import {MatSnackBar} from "@angular/material/snack-bar";
export type Provider = 'github' | 'google';

@Component({
  selector: 'app-buttton-providers',
  standalone: true,
  imports: [NgOptimizedImage],
  templateUrl: './buttton-providers.component.html',
  styleUrl: './buttton-providers.component.scss'
})
export class ButttonProvidersComponent {
	private _snackBar = inject(MatSnackBar);
	private _authService = inject(AuthService);
	private _router = inject(Router);

	providerAction(provider: Provider): void {
		if (provider === 'google') {
			this.signUpWithGoogle();
		} else {
			this.signUpWithGithub(); // TODO
		}
	}

	async signUpWithGoogle(): Promise<void> {
		console.log("Iniciando autenticación con Google");

		try {
			const result = await this._authService.signInWithGoogleProvider();
			if (result) {
				if (this._authService.shouldReload()) {
					this.openSnackBarSuccess();
					await this._router.navigateByUrl('/sunat/listcpe');
					location.reload();
				}
			} else {
				this.openSnackBarError();
			}
		} catch (error) {
			console.log(error);
		}
	}

	async signUpWithGithub(): Promise<void> {
		try {
			const result = await this._authService.signInWithGithubProvider();
			if (result) {
				this.openSnackBarSuccess();
			} else {
				this.openSnackBarError();
			}

			await this._router.navigateByUrl('/sunat/listcpe');
			console.log(result);
		} catch (error) {
			console.log(error);
		}
	}

	openSnackBarSuccess = () => {
		return this._snackBar.open(`Acceso correcto ${localStorage.getItem("displayName")} 😀 `, 'Cerrar', {
			duration: 2500,
			verticalPosition: 'top',
			horizontalPosition: 'end',
			panelClass: ['success'],
		});
	}

	openSnackBarError() {
		return this._snackBar.open('❌ Nombre de usuario o contraseña no válidos. Intenta otra vez.', 'Cerrar', {
			duration: 2500,
			verticalPosition: 'top',
			horizontalPosition: 'end',
			panelClass: ['error'],
		});
	}
}
