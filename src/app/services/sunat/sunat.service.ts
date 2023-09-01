import {inject, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {firstValueFrom, Observable} from "rxjs";
import {Ruc} from 'src/app/models/frontend/ruc'
import {provincias} from "../../models/backend/ubigeo";
import {ControlItem} from "../../models/frontend";

@Injectable({
	providedIn: 'root'
})
export class SunatService {
	/*getLoggedInUser(auth_token): Observable<any> {
		const headers = new Headers({
			'Content-Type': 'application/json',
			'Authorization': `Bearer ${auth_token}`
		})
		return this.http.get(apiUrl, { headers: headers })
	}*/

	private API_RUC_URL:string = "https://api.apis.net.pe/v2/sunat/ruc?numero=";


	private apiUrl = 'https://api.apifacturacion.com';
	private  httpClient = inject(HttpClient);
	constructor() {
	}

	getFacturationData(ruc: string):Observable<any> {
		const token:string = '50ea6d025fa1a12fd9ccbf3f355e5752';

		const headers = new HttpHeaders({
			'Content-Type': 'application/x-www-form-urlencoded'
		});

		const body = new URLSearchParams();
		body.set('token', token);

		const url = `${this.apiUrl}/ruc/${ruc}`;

		return this.httpClient.post(url, body.toString(), { headers });
	}

	private repository:Ruc =
		{
			"ruc":'10735804966',
			"razon_social":"Jorge Luis Ricra Alcantara",
			"estado" : "Habido",
			"condicion" : "Activo",
			"direccion" : "Federico Villareal 140 - El Tambo",
			"ubigeo" : "12006",
			"departamento" : "",
			"provincia" : "",
			"distrito" : ""
		};

	getRUCData = (ruc: string):any => { // type any es REEEE Junior pero es temporal para pruebas
		let api_key = "50ea6d025fa1a12fd9ccbf3f355e5752";
		const headers = new HttpHeaders({
			'Content-Type': 'application/json',
			'Authorization': `Bearer ${api_key}`
		});

		let response: any = []; // Ruc interface por implementar cuando adquiera API
		const requestOptions = { headers: headers };
		response = this.repository;

		return response;
	}


	getRUCDataAsync = (ruc:string) => {
		const token:string = '50ea6d025fa1a12fd9ccbf3f355e5752';

		const headers = new HttpHeaders({
			'Content-Type': 'application/x-www-form-urlencoded'
		});

		const body = new URLSearchParams();
		body.set('token', token);

		const url = `${this.apiUrl}/ruc/${ruc}`;

		return firstValueFrom(
			this.httpClient.post<any>(
				url, body.toString(), { headers }
			)
		);
	}
}
