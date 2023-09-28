import {AfterViewInit, Component, EventEmitter, forwardRef, Input, OnInit, Output} from '@angular/core';
import {ControlValueAccessor, FormBuilder, NG_VALUE_ACCESSOR} from "@angular/forms";
import PSPDFKit from "pspdfkit";
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
export class ModalComponent implements OnInit, ControlValueAccessor,AfterViewInit {

	@Input() idCpe!:string;
	@Output() register = new EventEmitter<any>();




	ngAfterViewInit() {
		PSPDFKit.load({
			// Use the assets directory URL as a base URL. PSPDFKit will download its library assets from here.
			baseUrl: location.protocol + '//' + location.host + '/assets/',
			// Replace [YOUR-DOCUMENT] with your document's name
			document: '/assets/20123456789-09-T001-123.pdf',
			container: '#pspdfkit-container',
			licenseKey: "YOUR_LICENSE_KEY_GOES_HERE",
		}).then((instance) => {
			// For the sake of this demo, store the PSPDFKit for Web instance
			// on the global object so that you can open the dev tools and
			// play with the PSPDFKit API.
			(<any>window).instance = instance;
		});
	}






	constructor(private fb: FormBuilder) {
	}
	ngOnInit(): void {}
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
