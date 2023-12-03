import {Component, inject} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import { AuthService } from "src/app/services";
import {MatSnackBar} from "@angular/material/snack-bar";
import { Router } from '@angular/router';
import {UserRegister, UserSignIn} from "../../../../models/backend/api/auth/userSignIn";
interface SignUpForm {
	names: FormControl<string>;
	lastName: FormControl<string>;
	email: FormControl<string>;
	password: FormControl<string>;
}
@Component({
	selector: 'app-signup',
	templateUrl: './signup.component.html',
	styleUrl: './signup.component.scss'
})
export class SignupComponent {
	hide = true;
	formBuilder = inject(FormBuilder);

	form: FormGroup<SignUpForm> = this.formBuilder.group({
		names: this.formBuilder.control('', {
			validators: Validators.required,
			nonNullable: true,
		}),
		lastName: this.formBuilder.control('', {
			validators: Validators.required,
			nonNullable: true,
		}),
		email: this.formBuilder.control('', {
			validators: [Validators.required, Validators.email],
			nonNullable: true,
		}),
		password: this.formBuilder.control('', {
			validators: Validators.required,
			nonNullable: true,
		}),
	});

	private authService = inject(AuthService);
	private _router = inject(Router);
	private _snackBar = inject(MatSnackBar);

	get isEmailValid(): string | boolean {
		const control = this.form.get('email');
		const isInvalid = control?.invalid && control.touched;

		if (isInvalid) {
			return control.hasError('required')
				? 'Este campo es requerido'
				: 'Ingrese un correo valido';
		}

		return false;
	}

	async signUp(): Promise<void> {
		if (this.form.invalid) return;

		const user: UserRegister = {
			userEmail: this.form.value.email || '',
			password: this.form.value.password || '',
			userName: this.form.value.names || '',
			userLastName: this.form.value.lastName || ''
		};

		try {
			const response = await this.authService.signUpWithEmailAndPassword(user);
			if (response) {
				const snackBarRef = this.openSnackBarSuccess();

				snackBarRef.afterDismissed().subscribe(() => {
					this._router.navigateByUrl('/profile/signinall');
				});
			} else  {
				this.openSnackBarError();
			}

		} catch (error) {
			console.error(error);
			this.openSnackBarError();
		}
	}

	openSnackBarSuccess = () => {
		return this._snackBar.open(`Acceso correcto ${this.form.value.names} 😀 `, 'Cerrar', {
			duration: 2500,
			verticalPosition: 'top',
			horizontalPosition: 'end',
			panelClass: ['success'],
		});
	}

	openSnackBarError() {
		return this._snackBar.open('❌ Esta correo ya existe, inicie sesión.', 'Cerrar', {
			duration: 2500,
			verticalPosition: 'top',
			horizontalPosition: 'end',
			panelClass: ['error'],
		});
	}
}
