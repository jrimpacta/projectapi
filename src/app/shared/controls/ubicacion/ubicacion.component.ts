import {Component, EventEmitter, forwardRef, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {ControlValueAccessor, FormBuilder, FormControl, FormGroup, NG_VALUE_ACCESSOR} from "@angular/forms";
import {ControlItem, Value} from "../../../models/frontend";
import {Placeholder} from "../date-range/date-range.component";

import {emisores} from "src/app/models/backend/gobierno";
import {  } from './pipes/departamento.pipe'
@Component({
	selector: 'app-ubicacion',
	templateUrl: './ubicacion.component.html',
	styleUrls: ['./ubicacion.component.scss'],
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef( () => UbicacionComponent),
			multi: true
		}
	]
})
export class UbicacionComponent implements OnInit, OnDestroy, ControlValueAccessor {
	form!:FormGroup;
	@Input() placeholder!:Placeholder;
	@Output() changed = new EventEmitter<Value>();

	emisores!: ControlItem[];
	constructor(private fb: FormBuilder) {
		this.emisores = emisores;

		this.form = this.fb.group({
			departamento: [null,
				{
					updateOn: 'change'
				}
			],
			provincia: [null],
			distrito: [null]
		});
	}
	private propagateChanged:any = ():void => {}
	private propagateTouched:any = ():void => {}

	ngOnDestroy(): void {
	}

	ngOnInit(): void {

	}

	registerOnChange(fn: any): void {
		this.propagateChanged = fn;
	}

	registerOnTouched(fn: any): void {
		this.propagateTouched = fn;
	}

	setDisabledState(isDisabled: boolean): void {
		//this.isDisable = isDisabled;
	}

	writeValue(obj: any): void {
		//this.value = obj;
	}

	departamentoChange = () => {
		const d = this.form.get('departamento');
		console.log("456");
		console.log(d?.value);
		alert("Noooooooo");
		this.changed.emit("Noooooooo");
	}

}
