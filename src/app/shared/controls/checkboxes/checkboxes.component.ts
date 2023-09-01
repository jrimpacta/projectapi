import { Component, EventEmitter, forwardRef, Input, OnInit, Output } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";
import { ControlItem, Value } from "../../../models/frontend";
export { ControlItem, Value } from "../../../models/frontend";

@Component({
	selector: 'app-checkboxes',
	templateUrl: './checkboxes.component.html',
	styleUrls: ['./checkboxes.component.scss'],
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef( () => CheckboxesComponent ),
			multi: true
		}
	]
})
export class CheckboxesComponent implements OnInit, ControlValueAccessor {
	value!:Value[];
	isDisable!:boolean;

	@Input() items!:ControlItem[];
	@Output() changed = new EventEmitter<Value[]>();

	ngOnInit(): void {
	}
	constructor() {
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
	onChanged = (value: Value, checked:Event):void => {
		const { target } = checked;
		const resultado = (target as HTMLInputElement).checked;
		const selected = this.getSelected(value, resultado);

		this.value = selected;
		this.propagateChanged(selected);
		this.changed.emit(selected);
	}

	private getSelected = (value:Value, checked:boolean):Value[] => {
		const selected: Value[] = this.value ? [...this.value] : [];

		if (checked) {
			if (!selected.includes(value)) {
				selected.push(value);
			}
		} else {
			const index = selected.indexOf(value);
			selected.splice(index, 1);
		}

		return selected.length ? selected : [];
	}

	isChecked = (value : Value):boolean => {
		return this.value && this.value.includes(value);
	}
}
