import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { firstValueFrom } from "rxjs";
import { ContribuyenteDTO } from '../../models/backend/cpe/gre';

@Injectable({
	providedIn: 'root'
})
export class ContribuyenteService {

	//private apiUrl = 'https://localhost:7026/contribuyente';
	private apiUrl = 'https://localhost:7058/contribuyente';
	private httpClient = inject(HttpClient);
	constructor() {

	}

	add = (contribuyente: ContribuyenteDTO) => {
		const body = JSON.stringify(contribuyente);
		const url = `${this.apiUrl}/create`;

		return firstValueFrom(
			this.httpClient.post<any>( url, body, this.createHeaders())
		);
	}

	search = (codigoIdentificacion : string) => {
		const url = `${this.apiUrl}/search/${codigoIdentificacion}`;

		return firstValueFrom(
			this.httpClient.get<any>(
				url, this.createHeaders()
			)
		);
	}

	createHeaders = () => {
		return {
			headers: new HttpHeaders({
				'content-type': 'application/json'
			})
		}
	}
}
