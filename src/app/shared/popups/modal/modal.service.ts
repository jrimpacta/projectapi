import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {firstValueFrom, Observable} from "rxjs";
@Injectable({
	providedIn: 'root'
})
export class ModalService {
	private apiUrl = 'https://localhost:7058/guia';
	private httpClient = inject(HttpClient);

	constructor() {
	}

	getPdf(Id:number) {

		return firstValueFrom(
			this.httpClient.get<any>(`${this.apiUrl}/cpe/${Id}`)
		);
	}
}
