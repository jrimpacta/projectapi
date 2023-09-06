import {Component, inject} from '@angular/core';
import {Firestore, collection, collectionData, getFirestore, getDocs} from '@angular/fire/firestore';
import {elementAt, Observable} from 'rxjs';
import {initializeApp} from "@angular/fire/app";
import {Environment} from "@angular/cli/lib/config/workspace-schema";
import {environment} from "../environments/environment";

export interface UserProfile { nombre: String; apellido: String; }
@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent {
	title = 'Impacta API';
	private firestore: Firestore = inject(Firestore);

	users$!: Observable<UserProfile[]>;

	constructor() {
		// get a reference to the user-profile collection
		const app = initializeApp(environment.firebase.config);
		const userProfileCollection = collection(getFirestore(app), 'test');
		console.log(userProfileCollection.firestore)
		//get documents (data) from the collection using collectionData
		let usuarios = getDocs(userProfileCollection);


		//console.log(usuarios);
		//this.users$ = collectionData(userProfileCollection) as Observable<UserProfile[]>;
		//console.log(this.users$)

		this.listar();


	}
	app = initializeApp(environment.firebase.config);
	userProfileCollection = collection(getFirestore(this.app), 'test');
	listar = async () => {
		try {
			const querySnapshot = await getDocs(this.userProfileCollection);

			const usuarios: UserProfile[] = [];

			querySnapshot.forEach((doc) => {
				const data = doc.data();
				// Verifica que el documento tenga la estructura de UserProfile
				if (this.isValidUserProfile(data)) {
					usuarios.push(data as UserProfile);
				}
			});

			console.log(usuarios);
		} catch (error) {
			console.error('Error al listar usuarios:', error);
		}
	}

	isValidUserProfile = (data: any): data is UserProfile => {
		return (
			typeof data === 'object' &&
			data !== null &&
			'nombre' in data &&
			'apellido' in data
		);
	}
}
