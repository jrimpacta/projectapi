import { Component, EventEmitter, forwardRef, Input, OnInit, Output } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";
import { ControlItem, Value } from "../../../models/frontend";

@Component({
	selector: 'app-radios',
	templateUrl: './radios.component.html',
	styleUrls: ['./radios.component.scss'],
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef( () => RadiosComponent),
			multi: true
		}
	]
})
export class RadiosComponent implements OnInit, ControlValueAccessor{
	value!:Value;
	isDisabled!:boolean;

	@Input() items!:ControlItem[];
	@Output() changed = new EventEmitter<Value>();
	ngOnInit(): void {
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
		this.isDisabled = isDisabled;
	}

	writeValue(obj: any): void {
		this.value = obj;
	}

	isChecked = (value:Value):boolean => {
		return this.value === value;
	}

	onChanged = (value:Value) => {
		this.value = value;
		this.propagateChanged(value);
		this.changed.emit(value);
	}
}
