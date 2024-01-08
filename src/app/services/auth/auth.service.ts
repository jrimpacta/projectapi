import {Injectable, inject} from '@angular/core';
import {
	//Auth,
	AuthProvider,
	GithubAuthProvider,
	GoogleAuthProvider,
	UserCredential,
	authState,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signInWithPopup, user, updateProfile, User,
	getAuth,
	OAuthProvider
} from '@angular/fire/auth';
import {UserRegister, UserSignIn} from "../../models/backend/api/auth/userSignIn";
import {environment} from "../../../environments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {firstValueFrom} from "rxjs";
import { FormGroup} from "@angular/forms";
import firebase from "firebase/compat";


@Injectable({
	providedIn: 'root'
})
export class AuthService {
	//private auth: Auth = inject(Auth);
	private auth = getAuth();
	private httpClient = inject(HttpClient);

	//readonly authState$ = authState(this.auth);

	async signUpWithEmailAndPassword(userRegister: UserRegister): Promise<UserCredential> {
		try {
			// Crear usuario
			const response = await createUserWithEmailAndPassword(
				this.auth,
				userRegister.userEmail,
				userRegister.password
			);

			// Obtener el usuario después de la creación
			const user = response.user;

			// Actualizar el perfil del usuario con el nombre
			await updateProfile(user, { displayName: `${userRegister.userName} ${userRegister.userLastName}` });

			return response;
		} catch (error) {
			console.error('Error durante el registro con correo y contraseña:', error);
			throw error;
		}
	}

	async logInWithEmailAndPassword(user: UserSignIn): Promise<UserCredential> {
		try {
			const response = await signInWithEmailAndPassword(this.auth, user.userName, user.password);

			// Logueado exitosamente, ahora obtenemos la información del usuario
			const userInfo = response.user;

			// Almacenamos la información en el localStorage
			if (userInfo) {
				localStorage.setItem('userEmail', userInfo.email || '');
				localStorage.setItem('displayName', userInfo.displayName || '');
				localStorage.setItem('photoURL', userInfo.photoURL || '');
			}

			return response;
		} catch (error) {
			console.error('Error durante el inicio de sesión con correo y contraseña:', error);
			throw error;
		}
	}

	logOut(): Promise<void> {
		return this.auth.signOut();
	}

	// providers

	signInWithMicrosoftProvider(): Promise<UserCredential> {
		const provider = new OAuthProvider('microsoft.com');
		console.log('llegó al provider: ' + provider);
		const auth = getAuth();

		/*
		let email: string  | null | undefined = "";
		let displayName: string  | null | undefined = "";
		let photoURL: string  | null | undefined = "";

		const unsubscribe = this.auth.onAuthStateChanged((userInfo) => {
			if (userInfo) {
				email = userInfo.email;
				displayName = userInfo.displayName;
				photoURL = userInfo.photoURL;
			} else {
				console.log('No se encontró datos del usuario');
			}
			unsubscribe();

			typeof email === "string" ? localStorage.setItem("userEmail", email) : null;
			typeof displayName === "string" ? localStorage.setItem("displayName", displayName) : null;
			typeof photoURL === "string" ? localStorage.setItem("photoURL", photoURL) : null;
		});*/

		return this.callPopUpMicrosoft(provider);
	}

	async callPopUpMicrosoft( provider: AuthProvider): Promise<UserCredential> {
		try {
			const result = await signInWithPopup(this.auth, provider);
			const credential = OAuthProvider.credentialFromResult(result);
			const accessToken = credential?.accessToken;
			const idToken = credential?.idToken;
			return result;
		} catch (error: any) {
			return error;
		}
	}

	signInWithGoogleProvider(): Promise<UserCredential> {
		const provider = new GoogleAuthProvider();
		let email: string  | null | undefined = "";
		let displayName: string  | null | undefined = "";
		let photoURL: string  | null | undefined = "";

		const unsubscribe = this.auth.onAuthStateChanged((userInfo) => {
			if (userInfo) {
				email = userInfo.email;
				displayName = userInfo.displayName;
				photoURL = userInfo.photoURL;
			} else {
				console.log('No se encontró datos del usuario');
			}

			unsubscribe();

			typeof email === "string" ? localStorage.setItem("userEmail", email) : null;
			typeof displayName === "string" ? localStorage.setItem("displayName", displayName) : null;
			typeof photoURL === "string" ? localStorage.setItem("photoURL", photoURL) : null;
		});

		return this.callPopUp(provider);
	}

	signInWithGithubProvider(): Promise<UserCredential> {
		const provider = new GithubAuthProvider();

		return this.callPopUp(provider);
	}

	async callPopUp(provider: AuthProvider): Promise<UserCredential> {
		try {
			const result = await signInWithPopup(this.auth, provider);

			return result;
		} catch (error: any) {
			return error;
		}
	}



	signInImpacta = async (user: UserSignIn) => {
		const body = JSON.stringify(user);
		const url = `${environment.apiHost}impacta/signin`;

		return firstValueFrom(
			this.httpClient.post<any>(url, body, this.createHeaders())
		);
	}

	private createHeaders(): { headers: HttpHeaders } {
		const headers = new HttpHeaders({
			'Content-Type': 'application/json',
		});

		return {headers};
	}

	private hasReloaded = false;

	shouldReload(): boolean {
		if (!this.hasReloaded) {
			this.hasReloaded = true;
			return true;
		}
		return false;
	}
}
