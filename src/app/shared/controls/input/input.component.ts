import { Component, EventEmitter, forwardRef, Input, OnInit, Output } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";

@Component({
	selector: 'app-input',
	templateUrl: './input.component.html',
	styleUrls: ['./input.component.scss'],
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef( () => InputComponent ),
			multi: true
		}
	]
})
export class InputComponent implements OnInit, ControlValueAccessor {
	@Input() placeholder: string = '';
	@Output() changed = new EventEmitter<string>();

	value:string;
	isDisabled: boolean;
	@Input() isReadOnly: boolean = false;
	ngOnInit(): void {
	}

	constructor() {
		this.value = '';
		this.isDisabled = false;
		this.isReadOnly = false;
	}

	private propagateChanged: any = () => {}
	private propagateTouched:any = () => {}
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

	onKeyup = (event:Event):void => {
		const { target } = event;

		this.value = (target as HTMLInputElement).value;
		this.propagateChanged(this.value);
		this.changed.emit(this.value);
	}

	onBlur = ():void => {
		this.propagateTouched();
	}
}
