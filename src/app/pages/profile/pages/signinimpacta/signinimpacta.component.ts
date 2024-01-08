import {Component, inject} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatButtonModule} from "@angular/material/button";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatIconModule} from "@angular/material/icon";
import {MatInputModule} from "@angular/material/input";
import {AuthService} from "src/app/services";
import {Router, RouterLink} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {ButttonProvidersComponent} from "../components/buttton-providers/buttton-providers.component";
import {ButtonsModule} from "../../../../shared";
import {getAuth, OAuthProvider, signInWithPopup} from "firebase/auth";

@Component({
	selector: 'app-signinimpacta',
	standalone: true,
	imports: [CommonModule, MatButtonModule, MatFormFieldModule, MatIconModule, MatInputModule, ReactiveFormsModule, ButttonProvidersComponent, RouterLink, ButtonsModule],
	templateUrl: './signinimpacta.component.html',
	styleUrl: './signinimpacta.component.scss'
})
export class SigninimpactaComponent {
	private _authService = inject(AuthService);
	private _router = inject(Router);
	private _snackBar = inject(MatSnackBar);

	private provider: OAuthProvider;

	constructor() {
		this.provider = new OAuthProvider('microsoft.com');
	}

	signInDoesntWork = async () => {
		const auth = getAuth();
		signInWithPopup(auth, this.provider)
			.then((result) => {
				// User is signed in.
				// IdP data available in result.additionalUserInfo.profile.

				// Get the OAuth access token and ID Token
				const credential = OAuthProvider.credentialFromResult(result);
				const accessToken  = credential?.accessToken;
				const idToken = credential?.idToken;
			})
			.catch((error) => {
				// Handle error.
			});
	}

	async signIn(): Promise<void> {
		console.log("Iniciando autenticación con Microsoft");

		try {
			console.log('Inicio');
			const result = await this._authService.signInWithMicrosoftProvider();
			console.log('Fin');
			console.log(result);
			/*if (result) {
				if (this._authService.shouldReload()) {
					this.openSnackBarSuccess();
					await this._router.navigateByUrl('/sunat/listcpe');
					location.reload();
				}
			} else {
				this.openSnackBarError();
			}*/
		} catch (error) {
			console.log('Error: ');
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
