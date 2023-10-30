import {Injectable} from '@angular/core';
import {ControlItem} from "../../models/frontend";
import {Distritos, Provincias} from "../../models/backend/ubigeo";

@Injectable({
	providedIn: 'root'
})
export class LocationService {

	constructor() {
	}

	getProvincias = (key: string): ControlItem[] => {
		let provinciasOriginal = Provincias.filter(x => x.department_id == key);

		return provinciasOriginal.map(item => ({
			value: item.id,
			label: item.name
		}));
	}

	getDistritos = (key: string): ControlItem[] => {
		let distritosOriginal = Distritos.filter(it => it.province_id  == key);

		return distritosOriginal.map(item => ({
			value: item.id,
			label: item.name
		}));
	}
}
