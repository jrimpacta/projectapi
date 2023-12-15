import {Component, Input, inject, OnInit, OnDestroy} from '@angular/core';
import {ProductoItem} from "src/app/models/backend/api/productoItem";
import { ProductoService } from "../../services/producto.service";
import {Subscription} from "rxjs";
import {ControlItem} from "src/app/models/frontend";
import {catalogo65} from "src/app/models/backend/catalogos";

@Component({
	selector: 'app-producto',
	templateUrl: './producto.component.html',
	styleUrls: ['./producto.component.scss']
})
export class ProductoComponent implements OnInit, OnDestroy {
	@Input() items!:ProductoItem[];
	unidadMedida!: ControlItem[];
	private  itemSubscription! : Subscription;
	itemService = inject(ProductoService);

	obtenerLabelUnidadMedida(unidadMedidaId: number): string {
		const unidadMedida = this.unidadMedida.find((u) => u.value === unidadMedidaId);
		return unidadMedida ? unidadMedida.label : '';
	}

	ngOnInit(): void {
		this.items = this.itemService.getItems();
		this.unidadMedida = catalogo65;

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
