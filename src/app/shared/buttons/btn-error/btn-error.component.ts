import {Component, Input} from '@angular/core';

export type ButtonType = 'button' | 'submit';
@Component({
  selector: 'app-btn-error',
  templateUrl: './btn-error.component.html',
  styleUrls: ['./btn-error.component.scss']
})
export class BtnErrorComponent {
	@Input() type: ButtonType;

	constructor() {
		this.type = 'button';
	}
}
