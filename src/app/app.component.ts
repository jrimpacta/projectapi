import {Component, inject} from '@angular/core';
import { Firestore, collection, collectionData} from '@angular/fire/firestore';
import {elementAt, Observable} from 'rxjs';

export interface UserProfile { nombre: String; apellido: String; }
@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent {
	title = 'Impacta API';
	private firestore: Firestore = inject(Firestore);

	users$: Observable<UserProfile[]>;

	constructor() {
		// get a reference to the user-profile collection
		const userProfileCollection = collection(this.firestore, 'test');
		//console.log(userProfileCollection.firestore)
		//get documents (data) from the collection using collectionData
		this.users$ = collectionData(userProfileCollection) as Observable<UserProfile[]>;
		console.log(this.users$)

	}
}
