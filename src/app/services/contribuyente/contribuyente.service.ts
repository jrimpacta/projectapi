import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { firstValueFrom } from "rxjs";
import { ContribuyenteDTO } from '../../models/backend/cpe/gre';
import {Order} from "../../models/backend/api";

@Injectable({
	providedIn: 'root'
})
export class ContribuyenteService {

	//private apiUrl = 'https://localhost:7026/contribuyente';
	private apiUrl = 'https://localhost:7058/guia';
	private httpClient = inject(HttpClient);
	constructor() {

	}

	add = (guia: Order) => {
		const body = JSON.stringify(guia);
		const url = `${this.apiUrl}/create`;

		return firstValueFrom(
			this.httpClient.post<any>( url, body, this.createHeaders())
		);
	}

	all = () => {
		const url = `${this.apiUrl}/allFiltered`;

		return firstValueFrom(
			this.httpClient.get<any>( url, this.createHeaders())
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
