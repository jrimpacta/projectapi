import { Component, EventEmitter, forwardRef, Input, OnInit, Output } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";

type passwordType = 'password' | 'text';
@Component({
	selector: 'app-password',
	templateUrl: './password.component.html',
	styleUrls: ['./password.component.scss'],
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef( () => PasswordComponent),
			multi: true
		}
	]
})
export class PasswordComponent implements  OnInit, ControlValueAccessor{
	value!:string;
	isDisabled!:boolean;
	passwordType!:passwordType;

	@Input() placeholder!:string;
	@Output() changed = new EventEmitter<string>();
	constructor() {
		this.passwordType = 'password';
	}

	onKeyup = (event:Event):void => {
		const { target } = event;
		this.value = (target as HTMLInputElement).value;
		this.propagateChange(this.value);
		this.changed.emit(this.value);
	}
	onBlur = () => {
		this.propagateTouched();
	}
	togglePassword:any = ():void => {
		this.passwordType = this.passwordType == 'password' ? 'text' : 'password';
	}
	ngOnInit(): void {
	}

	private propagateChange:any = ():void => {}
	private propagateTouched:any = ():void => {}

	registerOnChange(fn: any): void {
		this.propagateChange = fn;
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
}
