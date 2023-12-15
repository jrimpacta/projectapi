import {Component, EventEmitter, forwardRef, Input, OnInit, Output, inject} from '@angular/core';
import {ControlValueAccessor, FormBuilder, FormGroup, NG_VALUE_ACCESSOR, Validators} from "@angular/forms";
import {ControlItem} from "../../../models/frontend";
import {catalogo65} from "../../../models/backend/catalogos";
import {ProductoService} from "../../../pages/sunat/services/producto.service";
import {ProductoItem} from "../../../models/backend/api/productoItem";
import {regex, regexErrors} from "../../utils";
interface Item {
	quantity: number,
	value: number;
	UnitCode: string;
	codeSUNAT: string,
	detail: string
}

@Component({
	selector: 'app-form',
	templateUrl: './form.component.html',
	styleUrls: ['./form.component.scss'],
	providers: [{
		provide: NG_VALUE_ACCESSOR,
		useExisting: forwardRef(() => FormComponent),
		multi: true
	}]
})
export class FormComponent implements OnInit, ControlValueAccessor {
	itemsService = inject(ProductoService);

	formItem!: FormGroup;
	@Input() idCpe!:string;
	@Output() register = new EventEmitter<Item>();

	unidadMedida!: ControlItem[];
	constructor(private fb: FormBuilder) {
		this.unidadMedida = catalogo65;
	}

	ngOnInit(): void {
		this.formItem = this.fb.group({
			DescripcionDetallada: [null, {
				updateOn: 'change',
				validators: [
					Validators.required,
					Validators.minLength(5),
					Validators.maxLength(500)
				]
			}], CodigoProducto: [null, {
				updateOn: 'change'
			}], CantidadItem: [null, {
				updateOn: 'change',
				validators: [
					Validators.required,
					Validators.pattern(regex.number)
				]
			}], unidadMedidaItem: [null, {
				updateOn: 'change',
				validators: [
					Validators.required
				]
			}], IndicadorBienNormalizado: [null, {
				updateOn: 'blur',
				validators: []
			}], CodigoProductoSUNAT: [null, {
				updateOn: 'blur',
				validators: []
			}], CodigoPartidaArancelaria: [null, {
				updateOn: 'blur',
				validators: []
			}], CodigoGTIN: [null, {
				updateOn: 'blur',
				validators: []
			}],
		});

		this.onPatchValue();
	}

	onPatchValue = (): void => {
		this.formItem.patchValue({
		});
	}
	item!: ProductoItem;
	onSubmit = async () => {
		if (this.formItem.valid) {
			const value = {...this.formItem.value};
			this.propagateChanged(value);
			this.register.emit(value);

			this.item = {
				ProductoId : Math.floor(Math.random() * 25), // TODO
				CodigoProducto : this.formItem.get("CodigoProducto")?.value,
				UnidadMedidaId : this.formItem.get("unidadMedidaItem")?.value,
				CantidadItem : this.formItem.get("CantidadItem")?.value,
				DescripcionDetallada : this.formItem.get("DescripcionDetallada")?.value,
				IndicadorBienNormalizado : this.formItem.get("IndicadorBienNormalizado")?.value,
				CodigoProductoSUNAT : this.formItem.get("CodigoProductoSUNAT")?.value,
				CodigoPartidaArancelaria : this.formItem.get("CodigoPartidaArancelaria")?.value,
				CodigoGTIN : this.formItem.get("CodigoGTIN")?.value,
				lineaCounter : 0,
			};

			this.itemsService.addItem(this.item);
			console.log("Form enviado");
		}
	}
	private propagateChanged:any = ():void => {}
	private propagateTouched:any = ():void => {}
	registerOnChange(fn: any): void {
		this.propagateChanged = fn;
	}

	registerOnTouched(fn: any): void {
		this.propagateTouched = fn;
	}

	setDisabledState(isDisabled: boolean): void {
		if (isDisabled) {
			this.formItem.disable();
		} else {
			this.formItem.enable();
		}
	}

	writeValue(obj: any): void {
		this.formItem.patchValue(obj || {});
	}


	protected readonly regexErrors = regexErrors;
}
