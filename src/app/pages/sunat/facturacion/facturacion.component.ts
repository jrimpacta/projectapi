import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-facturacion',
  templateUrl: './facturacion.component.html',
  styleUrls: ['./facturacion.component.scss']
})
export class FacturacionComponent {
	idcpe!: number;
	constructor() {
		this.idcpe = 5;
	}
}
