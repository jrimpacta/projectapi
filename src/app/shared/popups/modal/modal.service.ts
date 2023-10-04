import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
	providedIn: 'root'
})
export class ModalService {
	private apiUrl = 'https://localhost:7058/guia';
	private httpClient = inject(HttpClient);

	constructor() {
	}

	getPdf(Id:number): Observable<string> {
		return this.httpClient.get<string>(`${this.apiUrl}/guia/cpe/${Id}`);
	}
}
