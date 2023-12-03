import {Injectable} from '@angular/core';
import {ProductoItem} from "../../../models/backend/api/productoItem";
import {Subject} from "rxjs";

@Injectable({
	providedIn: 'root'
})
export class ProductoService {
	private items: ProductoItem[] = [];

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
