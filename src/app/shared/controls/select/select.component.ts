import { Component, EventEmitter, forwardRef, Input, OnInit, Output } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";
import { ControlItem, Value } from "../../../models/frontend";
import { MatSelectChange } from "@angular/material/select";
export {ControlItem, Value} from "../../../models/frontend";
@Component({
	selector: 'app-select',
	templateUrl: './select.component.html',
	styleUrls: ['./select.component.scss'],
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef( () => SelectComponent),
			multi: true
		}
	]
})

export class SelectComponent implements OnInit, ControlValueAccessor {
	value!:Value;
	isDisable!:boolean;

	@Input() items!:ControlItem[];
	@Input() placeholder!:string;
	@Output() changed:EventEmitter<string> = new EventEmitter<string>();

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
		this.isDisable = isDisabled;
	}

	writeValue(obj: any): void {
		this.value = obj;
	}

	onChanged = (event:MatSelectChange):void => {
		const value = event.value ? event.value : null;
		this.value = value;
		this.propagateChanged(value);
		this.changed.emit(value);
	}

	onBlur = ():void => {
		this.propagateTouched();
	}
}
