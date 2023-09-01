import { Component, EventEmitter, forwardRef, Input, OnInit, Output } from '@angular/core';
import { ControlValueAccessor, FormBuilder, FormGroup, NG_VALUE_ACCESSOR } from "@angular/forms";

export interface Value {
	from: number;
	to: number;
}

export interface Placeholder {
	from: string;
	to: string;
}
@Component({
	selector: 'app-date-range',
	templateUrl: './date-range.component.html',
	styleUrls: ['./date-range.component.scss'],
	providers: [{
		provide: NG_VALUE_ACCESSOR,
		useExisting: forwardRef( () => DateRangeComponent ),
		multi: true
	}]
})
export class DateRangeComponent implements OnInit, ControlValueAccessor{
	form!:FormGroup;

	@Input() placeholder!:Placeholder;
	@Output() changed = new EventEmitter<Value>();
	constructor(private fb: FormBuilder) {
	}

	get min():Date {
		const from = this.form.controls['from'].value;
		return from ? new Date(from) : new Date();
	}
	get max():Date {
		const max = this.form.controls['to'].value;
		return max ? new Date(max) : new Date();
	}
	ngOnInit(): void {
		this.form = this.fb.group({
			from: [null],
			to: [null]
		});
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
			this.form.disable();
		} else {
			this.form.enable();
		}
	}

	writeValue(obj: any): void {
		this.form.patchValue(obj || {});
	}

	onChanged = () => {
		const value = {...this.form.value};
		this.propagateChanged(value);
		this.changed.emit(value);
	}

	onClosed = () => {

	}
}
