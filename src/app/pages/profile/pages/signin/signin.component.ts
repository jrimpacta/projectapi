import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { Router, RouterModule } from '@angular/router';
import { MatSnackBar } from "@angular/material/snack-bar";
import { AuthService } from "src/app/services";

interface SignUpForm {
	names: FormControl<string>;
	lastName: FormControl<string>;
	email: FormControl<string>;
	password: FormControl<string>;
}
@Component({
	selector: 'app-signin',
	templateUrl: './signin.component.html',
	styleUrl: './signin.component.scss'
})
export class SigninComponent {
	hide = true;
	formBuilder = inject(FormBuilder);

	private authService = inject(AuthService);
	private router = inject(Router);
	private _snackBar = inject(MatSnackBar);

	form: FormGroup = this.formBuilder.group({
		userName: this.formBuilder.control('', {
			validators: [Validators.required],
			nonNullable: true,
		}),
		password: this.formBuilder.control('', {
			validators: Validators.required,
			nonNullable: true,
		}),
	});

	get isEmailValid(): string | boolean {
		const control = this.form.get('userEmail');
		const isInvalid = control?.invalid && control.touched;

		if (isInvalid) {
			return control.hasError('required')
				? 'Este campo es obligatorio'
				: 'Dato necesario'; // Espacio disponible para mas validaciones
		}

		return false;
	}

	openSnackBarSuccess() {
		return this._snackBar.open('Acceso correcto 😀', 'Close', {
			duration: 2500,
			verticalPosition: 'top',
			horizontalPosition: 'end',
			panelClass: ['success'],
		});
	}

	openSnackBarError() {
		return this._snackBar.open('❌ Nombre de usuario o contraseña no válidos. Intenta otra vez.', 'Close', {
			duration: 2500,
			verticalPosition: 'top',
			horizontalPosition: 'end',
			panelClass: ['error'],
		});
	}

	signIn = async () => {
		if (this.form.invalid) return;

		const user = {
			userName: this.form.value.userName,
			password: this.form.value.password
		}

		let response = await this.authService.signInImpacta(user);
		console.log(response);

		if (response) {
			this.openSnackBarSuccess();

			// Guardar el username en localstorage
			localStorage.setItem("userName", user.userName);
			// Redireccionar al dashboard
			this.router.navigate(['../../sunat/listcpe']);
		} else {
			this.openSnackBarError();
		}
	}
}
