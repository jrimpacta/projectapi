import {Injectable} from '@angular/core';
import {ProductoItem} from "../../../models/backend/api/productoItem";
import {Subject} from "rxjs";

@Injectable({
	providedIn: 'root'
})
export class ProductoService {
	private items: ProductoItem[] = [];
	private itemsTest: ProductoItem[] = [
		{
			ProductoId : 1,
			CodigoProducto: "140201-0773",
			UnidadMedidaId : 1,
			CantidadItem : 12.5,
			DescripcionDetallada : "opopopo 123...",
			IndicadorBienNormalizado : "NO",
			CodigoProductoSUNAT : "s5d4f5sd4f6d5d55d5",
			CodigoPartidaArancelaria : "",
			CodigoGTIN : "",
			lineaCounter : 0,
		}, {
			ProductoId : 1,
			CodigoProducto: "140201-0774",
			UnidadMedidaId : 1,
			CantidadItem : 12.5,
			DescripcionDetallada : "Descripción 123...",
			IndicadorBienNormalizado : "NO",
			CodigoProductoSUNAT : "s5d4f5sd4f6d5d55d5",
			CodigoPartidaArancelaria : "",
			CodigoGTIN : "",
			lineaCounter : 0,
		}, {
			ProductoId : 1,
			CodigoProducto: "140201-0775",
			UnidadMedidaId : 1,
			CantidadItem : 12.5,
			DescripcionDetallada : "Descripción 3...",
			IndicadorBienNormalizado : "NO",
			CodigoProductoSUNAT : "s5d4f5sd4f6d5d55d5",
			CodigoPartidaArancelaria : "",
			CodigoGTIN : "",
			lineaCounter : 0,
		}
	];
	itemsSubject = new Subject();
	getItems = () => {
		return [...this.items]
	}

	addItem = (productoItem:ProductoItem) => {
		this.items.push(productoItem);
		this.itemsSubject.next(this.items);
	}

	deleteItem = (descripcion:string) => {
		this.items = this.items.filter(it => it.DescripcionDetallada !== descripcion );
		this.itemsSubject.next(this.items)
	}

	constructor() {
	}
}
