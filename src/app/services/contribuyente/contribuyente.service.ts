import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { firstValueFrom } from "rxjs";
import { Contribuyente, ContribuyenteDTO } from '../../models/backend/cpe/gre';

@Injectable({
	providedIn: 'root'
})
export class ContribuyenteService {

	private apiUrl = 'https://localhost:7026/contribuyente';
	private httpClient = inject(HttpClient);
	constructor() {

	}

	saveContribuyente = (contribuyente: ContribuyenteDTO) => {
		//const token:string = '50ea6d025fa1a12fd9ccbf3f355e5752'; Pa' despues

		const headers = new HttpHeaders({
			'content-type': 'application/json'
		});

		const body = JSON.stringify(contribuyente);
		//body.set('token', token);

		const url = `${this.apiUrl}/create`;

		return firstValueFrom(
			this.httpClient.post<any>(
				url, body, { headers }
			)
		);


	}
}
