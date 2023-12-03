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

interface LogInForm {
	email: FormControl<string>;
	password: FormControl<string>;
}

@Component({
	selector: 'app-signinall',
	standalone: true,
	imports: [CommonModule, MatButtonModule, MatFormFieldModule, MatIconModule, MatInputModule, ReactiveFormsModule, ButttonProvidersComponent, RouterLink],
	templateUrl: './signinall.component.html',
	styleUrl: './signinall.component.scss'
})
export class SigninallComponent {
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

		try {
			const result = await this.authService.logInWithEmailAndPassword(user);
			if (this.authService.shouldReload()) {
				this.openSnackBarSuccess();
				await this.router.navigateByUrl('/sunat/listcpe');
				location.reload();
			}
		} catch (error) {
			this.openSnackBarError();
		}
	}
}
