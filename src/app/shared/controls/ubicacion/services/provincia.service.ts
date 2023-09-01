import {Injectable} from '@angular/core';
import { departamentosBadWay } from "src/app/models/backend/ubigeo/departamento";
import {firstValueFrom} from "rxjs";

@Injectable({
	providedIn: 'root'
})
export class ProvinciaService {

	constructor() {
	}

	getProvincia = () => {
		let arreglo = [10, 11, 3, 20, 5];
		let mayorQueDiez = arreglo.filter(element => element > 10);
		return mayorQueDiez;
	}
}
