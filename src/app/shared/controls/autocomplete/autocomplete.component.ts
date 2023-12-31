import {Component, EventEmitter, forwardRef, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {Subject, Observable, last, pipe} from "rxjs";
import {takeUntil, distinctUntilChanged, startWith, map, filter} from "rxjs";
import {ControlItem, Value} from "../../../models/frontend";
import {ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR} from "@angular/forms";

@Component({
	selector: 'app-autocomplete',
	templateUrl: './autocomplete.component.html',
	styleUrls: ['./autocomplete.component.scss'],
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef( () => AutocompleteComponent),
			multi: true
		}
	]
})
export class AutocompleteComponent implements OnInit, OnDestroy, ControlValueAccessor{
	@Input() items!: ControlItem[];
	@Input() placeholder!: string;

	@Output() changed = new EventEmitter<Value>();

	formControl = new FormControl();
	options$!: Observable<ControlItem[]>;

	private destroy  = new Subject<any>();

	constructor() {
	}
	ngOnDestroy(): void {
		this.destroy.next(null);
		this.destroy.complete();
	}

	private propagateChange:any = () => {}
	private propagateTouched:any = () => {}
	ngOnInit(): void {
		this.options$ = this.formControl.valueChanges.pipe(
			startWith(''),
			filter(value => typeof value === 'string' || typeof value === 'object'),
			map(value => typeof value === 'string' ? value : value.label ),
			map(label => label ? this.filter(label) : this.items.slice() )
		);

		this.formControl.valueChanges.pipe(
			takeUntil(this.destroy),
			distinctUntilChanged()
		).subscribe(item => {
			const value = typeof item === "object" ? item.value : null;
			this.propagateChange(value);
			this.changed.emit(value);
		});
	}

	private filter(value:string): ControlItem[] {
		const filterValue = value.toLowerCase();
		return this.items.filter(items => items.label.toLowerCase().includes(filterValue));
	}
	registerOnChange(fn: any): void {
		this.propagateChange = fn;
	}

	registerOnTouched(fn: any): void {
		this.propagateTouched = fn;
	}

	setDisabledState(isDisabled: boolean): void {
		if(isDisabled) {
			this.formControl.disabled;
		} else {
			this.formControl.enabled;
		}
	}

	writeValue(obj: any): void {
		const selectedOption = this.items.find(item => item.value === obj );
		this.formControl.setValue(selectedOption);
	}

	displayFn(items? : ControlItem): string  {
		return items ? items.label : '';
	}

	onBlur() : void {
		this.propagateTouched();
	}

}
