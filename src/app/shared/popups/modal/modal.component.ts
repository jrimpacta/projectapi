import {AfterViewInit, Component, EventEmitter, forwardRef, Inject, inject, Input, OnInit, Output} from '@angular/core';
import {ControlValueAccessor, FormBuilder, NG_VALUE_ACCESSOR} from "@angular/forms";
import {DomSanitizer, SafeResourceUrl } from "@angular/platform-browser";
import {ModalService} from "./modal.service";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
export interface pdfr {
    pdfEnterprise: string
}
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
	id!: number;
	pdf64! : string;
	safeUrl!:SafeResourceUrl;
 	async ngOnInit() {
		const response : any = await this.modalService.getPdf(this.id);
		this.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
			"data:application/pdf;base64," + response["pdfEnterprise"]);
	}

	constructor(private sanitizer: DomSanitizer, @Inject(MAT_DIALOG_DATA) public data: any) {
		this.id = this.data.id;
		console.log('ID recibido en el diálogo:', this.id);
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
