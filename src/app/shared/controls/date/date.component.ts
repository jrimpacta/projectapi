import { Component, EventEmitter, forwardRef, Input, OnInit, Output } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";
import { MatDatepickerInputEvent } from "@angular/material/datepicker";

type Value = number;
@Component({
	selector: 'app-date',
	templateUrl: './date.component.html',
	styleUrls: ['./date.component.scss'],
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef( () => DateComponent),
			multi: true
		}
	]
})
export class DateComponent implements OnInit, ControlValueAccessor{
	value!:Value;
	isDisabled!:boolean;

	@Input() placeholder!:string;
	@Input() min!: Date;
	@Input() max!: Date;
	@Output() closed = new EventEmitter<void>();
	@Output() changed = new EventEmitter<Value>();

	get inputValue(): Date {
		return this.value ? new Date(this.value) : new Date();
	}
	ngOnInit(): void {
	}
	constructor() {
		this.isDisabled = false;
	}

	private propagateChanged: any = ():void => {}
	private propagateTouched: any = ():void => {}
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

	onChanged = (event: MatDatepickerInputEvent<Date>):void => {
		const value = event.value ? event.value.getTime() : new Date().getTime();
		this.value = value;
		this.propagateChanged(value);
		this.changed.emit(value);
	}
	onClosed = ():void => {
		this.propagateTouched();
		this.closed.emit();
	}
}
