import {AfterViewInit, Component, EventEmitter, forwardRef, inject, Input, OnInit, Output} from '@angular/core';
import {ControlValueAccessor, FormBuilder, NG_VALUE_ACCESSOR} from "@angular/forms";
import {DomSanitizer, SafeResourceUrl } from "@angular/platform-browser";
import {ModalService} from "./modal.service";
@Component({
	selector: 'app-modal',
	templateUrl: './modal.component.html',
	styleUrls: ['./modal.component.scss'],
	providers: [{
		provide: NG_VALUE_ACCESSOR,
		useExisting: forwardRef(() => ModalComponent),
		multi: true
	}]
})
export class ModalComponent implements OnInit, ControlValueAccessor {

	@Input() idCpe!:number;
	@Output() register = new EventEmitter<any>();
	modalService = inject(ModalService);

	pdf64! : string;
	safeUrl!:SafeResourceUrl;
	ngOnInit(): void {
	}
	constructor(private sanitizer: DomSanitizer) {
		const response:any = this.modalService.getPdf(this.idCpe)
		this.pdf64 = response as string;
		this.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl("data:application/pdf;base64," + this.pdf64);
	}

	getData = (Id:number) => {
		return this.modalService.getPdf(3);
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

	}

	writeValue(obj: any): void {

	}
}
