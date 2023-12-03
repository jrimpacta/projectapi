import {FormControl} from "@angular/forms";

export interface UserSignIn {
	userName: string,
	password: string
}

export interface UserRegister {
	userEmail: string,
	userName: string,
	userLastName: string,
	password: string
}
