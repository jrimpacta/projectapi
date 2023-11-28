import { inject, Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpResponse} from "@angular/common/http";
import {catchError, firstValueFrom, map, Observable} from "rxjs";
import { ContribuyenteDTO } from '../../models/backend/cpe/gre';
import {Order} from "../../models/backend/api";
import {GreList} from "../../models/backend/cpe/gre/grelist";
import {environment} from "../../../environments/environment";

@Injectable({
	providedIn: 'root'
})
export class ContribuyenteService {

	//private apiUrl = 'https://localhost:7026/contribuyente';
	//private apiUrl = 'https://localhost:7058/guia'; Development
	private apiUrl:string = `${environment.apiHost}guia`;
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
	private createHeaders(): { headers: HttpHeaders } {
		const headers = new HttpHeaders({
			'Content-Type': 'application/json',
		});

		return { headers };
	}

	all = () => {
		const url = `${this.apiUrl}/allFiltered`;

		return firstValueFrom(
			this.httpClient.get<any>( url, this.createHeaders())
		);
	}

	getAllCont(): Observable<GreList[]> {
		return this.httpClient.get<GreList[]>(`${this.apiUrl}/allFiltered`);
	}

	search = (codigoIdentificacion : string) => {
		const url = `${this.apiUrl}/search/${codigoIdentificacion}`;

		return firstValueFrom(
			this.httpClient.get<any>(
				url, this.createHeaders()
			)
		);
	}
}
