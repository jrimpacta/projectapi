import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { regex, regexErrors, markFormGroupTouched } from 'src/app/shared/utils'
import { ControlItem } from "src/app/models/frontend";

import { NotificationService } from 'src/app/services';

@Component({
  selector: 'app-shared',
  templateUrl: './shared.component.html',
  styleUrls: ['./shared.component.scss']
})
export class SharedComponent implements OnInit  {

	form! : FormGroup;
	isInline! : boolean;
	regexErrors = regexErrors;
	items!:ControlItem[];
	showSpinner = false;

	constructor(private fb:FormBuilder, private notification: NotificationService) {
		this.isInline = true;
		this.items = [
			{label: 'Uno', value: 1},
			{label: 'Dos', value: 2},
			{label: 'Tres', value: 3},
			{label: 'Cuatro', value: 4}
		];
	}
	ngOnInit(): void {
		this.form = this.fb.group({
			input: [null, {
				updateOn: 'blur',
				validators: [
					Validators.required,
					Validators.minLength(3),
					Validators.pattern(regex.number)
				]
			}],
			password: [null, {
				updateOn: 'blur',
				validators: [
					Validators.required,
					Validators.minLength(8)
				]
			}],
			autocomplete: [null, {
				updateOn: 'blur',
				validators: [
					Validators.required
				]
			}],
			select: [null, {
				updateOn: 'change',
				validators: [
					Validators.required
				]
			}],
			checkboxes: [null, {
				updateOn: 'change',
				validators: [
					Validators.required
				]
			}],
			radios: [null, {
				updateOn: 'change',
				validators: [
					Validators.required
				]
			}],
			date: [null, {
				updateOn: 'change',
				validators: [
					Validators.required
				]
			}],
			dateRange: [null, {
				updateOn: 'change',
				validators: [
					Validators.required
				]
			}]
		});
	}

	onPatchValue():void {
		this.form.patchValue({
			input: 'Jorgeo master'
		});
	}

	organizeElements = () => {
		this.isInline = !this.isInline;
	}

	onSubmit = ():void => {

		if (!this.form.valid) {
			console.log("Presionó el botón de submit");
			markFormGroupTouched(this.form)
		}
	}

	onToggleDisabled(): void {
		if(this.form.enabled) {
			this.form.disable();
		} else {
			this.form.enable();
		}
	}

	onToggleSpinner = () : void => {
		this.showSpinner = this.showSpinner ? false : true;
	}

	onError = () : void => {
		this.notification.error("Se encontraron errores en el proceso");
	}

	onSuccess = () : void => {
		this.notification.success("El procedimiento fue exitoso");
	}

}
