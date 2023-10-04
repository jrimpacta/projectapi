import {Component, Input, inject, OnInit, OnDestroy} from '@angular/core';
import {ProductoItem} from "src/app/models/backend/api/productoItem";
import { ProductoService } from "../../services/producto.service";
import {Subscription} from "rxjs";

@Component({
	selector: 'app-producto',
	templateUrl: './producto.component.html',
	styleUrls: ['./producto.component.scss']
})
export class ProductoComponent implements OnInit, OnDestroy {
	@Input() items!:ProductoItem[];
	private  itemSubscription! : Subscription;
	itemService = inject(ProductoService);

	ngOnInit(): void {
		this.items = this.itemService.getItems();

		this.itemSubscription = this.itemService.itemsSubject.subscribe( () => {
			this.items = this.itemService.getItems();
		} );
	}

	delete = (descripcion:string) => {
		this.itemService.deleteItem(descripcion);
	}

	ngOnDestroy(): void {
		this.itemSubscription.unsubscribe();
	}
}
