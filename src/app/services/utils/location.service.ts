import {Injectable} from '@angular/core';
import {ControlItem} from "../../models/frontend";
import {provincias} from "../../models/backend/ubigeo";
import {distritos} from "../../models/backend/ubigeo/distrito";

@Injectable({
	providedIn: 'root'
})
export class LocationService {

	constructor() {
	}

	getProvincia = (key: string): ControlItem[] => {
		//console.log(key);
		return provincias[key];
	}

	getDistrito = (key: string): ControlItem[] => {
		//console.log(key);
		return distritos[key];
	}
}
