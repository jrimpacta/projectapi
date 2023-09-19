import {Component, inject, OnInit, signal} from '@angular/core';
import {MatTableModule} from '@angular/material/table';
import {ContribuyenteService, DateService} from "src/app/services";
import {Order} from "src/app/models/backend/api";
import {catalogo} from "src/app/models/backend/catalogos/catalogo";
import {GreList} from "../../../../models/backend/cpe/gre/grelist";

export interface PeriodicElement {
    name: string;
    position: number;
    weight: number;
    symbol: string;
}

const ELEMENT_DATA: GreList[] = [
	{
		"id": 1,
		"fechaEmision": "2023-09-18T06:02:01.258",
		"fechaInicioTraslado": "2023-09-18T06:21:54.785",
		"destinatario": "string",
		"transportista": "string",
		"unidadMedida": "CAJA",
		"pesoTotal": 100.12,
		"motivo": "Venta sujeta a confirmación del comprador"
	},
	{
		"id": 2,
		"fechaEmision": "2023-09-18T06:02:01.258",
		"fechaInicioTraslado": "2023-09-18T06:21:54.785",
		"destinatario": "string",
		"transportista": "string",
		"unidadMedida": "CAJA",
		"pesoTotal": 100.12,
		"motivo": "Venta sujeta a confirmación del comprador"
	},
	{
		"id": 3,
		"fechaEmision": "2023-09-18T06:02:01.258",
		"fechaInicioTraslado": "2023-09-18T06:21:54.785",
		"destinatario": "string",
		"transportista": "string",
		"unidadMedida": "CAJA",
		"pesoTotal": 100.12,
		"motivo": "Venta sujeta a confirmación del comprador"
	},
	{
		"id": 4,
		"fechaEmision": "2023-09-18T06:02:01.258",
		"fechaInicioTraslado": "2023-09-18T06:21:54.785",
		"destinatario": "string",
		"transportista": "string",
		"unidadMedida": "CAJA",
		"pesoTotal": 100.12,
		"motivo": "Venta sujeta a confirmación del comprador"
	},
	{
		"id": 5,
		"fechaEmision": "2023-09-21T05:00:00",
		"fechaInicioTraslado": "2023-09-21T05:00:00",
		"destinatario": "CONECTA RETAIL S.A.",
		"transportista": "string",
		"unidadMedida": "DOCENA POR 10**6",
		"pesoTotal": 10,
		"motivo": "Traslado a zona primaria"
	}
]

@Component({
    selector: 'app-grelist',
    templateUrl: './grelist.component.html',
    styleUrls: ['./grelist.component.scss']
})
export class GrelistComponent implements OnInit {

    displayedColumns: string[] = ['fechaEmision', 'fechaInicioTraslado', 'destinatario', 'transportista', 'unidadMedida', 'pesoTotal', 'motivo' ];

    contribuyenteServices = inject(ContribuyenteService);
	dateServices = inject(DateService);
    allGuiasSignal = signal<GreList[]>([]);

    load = async () => {
		this.dataSource = await this.contribuyenteServices.all();
    }

    ngOnInit(): void {
        this.load().then(r => console.log('se cargó la lista'));


		const fechaISO = "2023-09-19T00:35:34.4778198";
		console.log(this.dateServices.parseDateFromISO(fechaISO));


	}

	dataSource = this.allGuiasSignal();
}
