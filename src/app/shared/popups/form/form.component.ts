import {Component, EventEmitter, forwardRef, Input, OnInit, Output} from '@angular/core';
import {ControlValueAccessor, FormBuilder, FormGroup, NG_VALUE_ACCESSOR} from "@angular/forms";
import {ControlItem} from "../../../models/frontend";
import {catalogo65} from "../../../models/backend/catalogos";

interface Quantity {
	value: number;
	UnitCode: string;
}

interface Item {
	quantity: Quantity,
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

	formItem!: FormGroup;
	@Input() idCpe!:string;
	@Output() register = new EventEmitter<Item>();

	unidadMedida!: ControlItem[];
	constructor(private fb: FormBuilder) {
		this.unidadMedida = catalogo65.items;
	}

	ngOnInit(): void {
		this.formItem = this.fb.group({
			quantity: [null, {
				updateOn: 'blur',
				validators: []
			}], unidadMedida: [null, {
				updateOn: 'blur',
				validators: []
			}], codeSunat: [null, {
				updateOn: 'blur',
				validators: []
			}], detail: [null, {
				updateOn: 'blur',
				validators: []
			}]
		});

		this.onPatchValue();
	}

	onPatchValue = (): void => {
		this.formItem.patchValue({
			quantity: "0.00",
			// TO DO
			//controlPartidaDepartamento: '3926',
			//controlLlegadaDepartamento: '3926'
		});
	}

	onSubmit = async () => {
		if (!this.formItem.valid) {
			const value = {...this.formItem.value};
			this.propagateChanged(value);
			this.register.emit(value);
			//markFormGroupTouched(this.form);
			console.log("Form enviado!!");
			//this.showSpinner = true;
			//await new Promise((f: any) => setTimeout(f, 1000));
			//this.showSpinner = false;
			console.log("Presionó el botón de submit");
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


}
