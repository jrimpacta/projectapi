import {Injectable} from '@angular/core';

@Injectable({
	providedIn: 'root'
})
export class DateService {

	constructor() {
	}

	parseDateFromISO = (dateISO : string):string => {
		const fechaEnMilisegundos = Date.parse(dateISO);
		const fecha = new Date(fechaEnMilisegundos);

		const day = fecha.getDate().toString().padStart(2, '0');
		const month = (fecha.getMonth() + 1).toString().padStart(2, '0'); // Se suma 1 porque los meses comienzan desde 0
		const year = fecha.getFullYear();

		return  `${day}/${month}/${year}`;
	}
}
