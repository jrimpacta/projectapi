import {Component, inject, OnDestroy, OnInit, signal} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ControlItem} from "src/app/models/frontend";
import {markFormGroupTouched, regex, regexErrors} from 'src/app/shared/utils';
import {NotificationService, SunatService} from 'src/app/services';
import { catalogo06, catalogo18, catalogo20, catalogo65 } from "src/app/models/backend/catalogos";
import {emisores} from "src/app/models/backend/gobierno";
import {serieCorrelativo} from "src/app/models/backend/documentos";
import {ThemePalette} from '@angular/material/core';
import {departamentosBadWay} from "src/app/models/backend/ubigeo";
import {LocationService} from "src/app/services/utils/location.service";

export interface ChipColor {
	name: string;
	color: ThemePalette;
}

@Component({
	selector: 'app-greremitente',
	templateUrl: './greremitente.component.html',
	styleUrls: ['./greremitente.component.scss']
})
export class GreremitenteComponent implements OnInit, OnDestroy {
	availableColors: ChipColor[] = [
		{name: 'none', color: undefined},
		{name: 'Primary', color: 'primary'},
		{name: 'Accent', color: 'accent'},
		{name: 'Warn', color: 'warn'},
	];
	form!: FormGroup;
	isInline!: boolean;
	regexErrors = regexErrors;
	showSpinner = false;
	showSpinnerRUC = false;
	showSpinnerContribuyente = false;

	serieCorrelativo!: ControlItem[];
	motivos!: ControlItem[];
	documentosIdentidad!: ControlItem[];
	retornos!: ControlItem[];
	controlVehiculos!: ControlItem[];
	tipoTransporte!: ControlItem[];
	emisores!: ControlItem[];
	unidadMedida!: ControlItem[];

	departamentosPartida!: ControlItem[];
	provinciasPartida!: ControlItem[];
	distritosPartida!: ControlItem[];
	departamentosLlegada!: ControlItem[];
	provinciasLlegada!: ControlItem[];
	distritosLlegada!: ControlItem[];
	sunatService: SunatService = inject(SunatService);
	notificacion: NotificationService = inject(NotificationService);
	locationService: LocationService = inject(LocationService);

	constructor(private fb: FormBuilder) {

		this.isInline = false;

		this.serieCorrelativo = serieCorrelativo.items;
		this.motivos = catalogo20.items;
		this.documentosIdentidad = catalogo06.items;
		this.emisores = emisores.items;
		this.unidadMedida = catalogo65.items;

		this.departamentosPartida = departamentosBadWay.items;
		this.departamentosLlegada = departamentosBadWay.items;
		// Por validar
		this.retornos = [
			{label: 'Retorno de Vehículo Vacío', value: 'r1'},
			{label: 'Retorno con Envases Vacíos', value: 'r2'},
			{label: 'Transbordo Programado', value: 'r3'}
		];
		this.controlVehiculos = [
			{label: 'Vehículos Categoría M1 o L', value: 'v1'},
			{label: 'Traslado total (DAM o DS)', value: 'v2'},
			{label: 'Datos del Transportista', value: 'v3'}
		];
		// end por validar

		this.tipoTransporte = catalogo18.items;


	}
	ngOnInit(): void {
		this.form = this.fb.group({
			tipoSerie: [null, {
				updateOn: 'change',
				validators: []
			}], numSerieCorrelativo: [null, {
				updateOn: '',
				validators: [
					Validators.required,
				]
			}], docIdentidad: [null, {
				updateOn: 'change',
				validators: [
					Validators.required
				]
			}], docContribuyente: [null, {
				updateOn: '',
				validators: [
					Validators.required,
					Validators.minLength(11), // Verificar,
					Validators.maxLength(11),
					Validators.pattern(regex.number)
				],
			}], nomContribuyente: [null, {
				updateOn: 'blur',
				validators: [
					Validators.required,
					Validators.minLength(5), // Verificar
					Validators.maxLength(50)
				]
			}], controlFechaEmision: [null, {
				updateOn: 'change',
				validators: [
					Validators.required
				]
			}], controlEntregaTransportista: [null, { // Date
				updateOn: 'change',
				validators: [
					Validators.required
				]
			}], controlRetornos: [null, {
				updateOn: 'change',
				validators: [
					Validators.required
				]
			}], controlVehiculos: [null, {
				updateOn: 'change',
				validators: [
					Validators.required
				]
			}], controlMotivos: [null, {
				updateOn: 'change',
				validators: []
			}], controlTipoTransporte: [null, {
				updateOn: 'change',
				validators: []
			}], controlRUCTransportista: [null, {
				updateOn: '',
				validators: [
					Validators.required,
					Validators.minLength(11), // Verificar
					Validators.maxLength(11)
				]
			}], controlNomTransportista: [null, {
				updateOn: 'blur',
				validators: [
					Validators.required,
					Validators.minLength(5), // Verificar
					Validators.maxLength(250)
				]
			}], // controlMTCTransportista
			controlMTCTransportista: [null, {
				updateOn: 'blur',
				validators: [
					Validators.minLength(5), // Verificar
					Validators.maxLength(20)
				]
			}], controlVehiculoPlaca: [null, {
				updateOn: 'blur',
				validators: [
					Validators.minLength(5), // Verificar
					Validators.maxLength(20)
				]
			}], controlVehiculoHabilitacion: [null, {
				updateOn: 'blur',
				validators: [
					Validators.minLength(5), // Verificar
					Validators.maxLength(20)
				]
			}], controlVehiculoAutorizacion: [null, {
				updateOn: 'blur',
				validators: [
					Validators.minLength(5), // Verificar
					Validators.maxLength(20)
				]
			}], controlVehiculoEmisor: [null, {
				updateOn: 'change',
				validators: []
			}], dniNuevoTranspordtista: [null, {
				updateOn: 'change',
				validators: []
			}], dniNuevoTdransportista: [null, {
				updateOn: 'change',
				validators: []
			}], controlDNIConductor: [null, {
				updateOn: 'change',
				validators: []
			}], controlDocConductor: [null, {
				updateOn: 'change',
				validators: []
			}], controlNombreConductor: [null, {
				updateOn: 'change',
				validators: []
			}], ubicacionLlegada: [null, {
				updateOn: 'change',
				validators: []
			}], controlPartidaDepartamento: [null, {
				updateOn: '',
				validators: []
			}], controlPartidaProvincia: [null, {
				updateOn: '',
				validators: []
			}], controlPartidaDistrito: [null, {
				updateOn: 'change',
				validators: []
			}], controlPartidaPunto: [null, {
				updateOn: 'blur',
				validators: [
					Validators.required,
					Validators.minLength(5),
					Validators.maxLength(200)
				]
			}], controlLlegadaDepartamento: [null, {
				updateOn: '',
				validators: []
			}], controlLlegadaProvincia: [null, {
				updateOn: '',
				validators: []
			}], controlLlegadaDistrito: [null, {
				updateOn: 'change',
				validators: []
			}], controlLlegadaPunto: [null, {
				updateOn: 'blur',
				validators: [
					Validators.required,
					Validators.minLength(5),
					Validators.maxLength(200)
				]
			}], unidadMedidaTotal: [null, {
				updateOn: 'blur',
				validators: []
			}],
		});

		this.onRUCMatch();
		this.onTransportistaMatch();
		this.onPatchValue();
	}
	contribuyenteDetailsSignal = signal<any>({});
	transportistaDetailsSignal = signal<any>({});
	chipsContribuyente:boolean = false;
	chipsTransportista:boolean = false;

	testingLugarLlegada = () => {
		const value = this.form.get('ubicacionLlegada');

		console.log(value);
	}

	onRUCMatch = async () => {
		const inputFieldControl = this.form.get('docContribuyente');
		if (inputFieldControl) {
			inputFieldControl.valueChanges.subscribe(async (value) => {
				//console.log("Se escribió : " + value);
				if (value && value.length === 11) {
					// Aquí puedes ejecutar la función cuando se ingresan 11 dígitos
					// console.log('Se ingresaron 11 dígitos:', value);

					this.showSpinnerContribuyente = true;
					const contribuyente = await this.sunatService.getRUCDataAsync(value);
					this.contribuyenteDetailsSignal.set(contribuyente);
					this.chipsContribuyente = true;
					this.form.patchValue({
						nomContribuyente: contribuyente.razon_social
					});

					console.log(contribuyente);
					this.showSpinnerContribuyente = false;


				} else {
					this.chipsContribuyente = false;
				}
			});
		}
	}

	onTransportistaMatch = async () => {
		const inputFieldControl = this.form.get('controlRUCTransportista');
		if (inputFieldControl) {
			inputFieldControl.valueChanges.subscribe(async (value) => {
				//console.log("Se escribió : " + value);
				if (value && value.length === 11) {
					// Aquí puedes ejecutar la función cuando se ingresan 11 dígitos
					// console.log('Se ingresaron 11 dígitos:', value);

					this.showSpinnerRUC = true;
					const contribuyente = await this.sunatService.getRUCDataAsync(value);
					this.transportistaDetailsSignal.set(contribuyente);
					this.chipsTransportista = true;
					this.form.patchValue({
						controlNomTransportista: contribuyente.razon_social
					});

					console.log(contribuyente);
					this.showSpinnerRUC = false;


				} else {
					this.chipsContribuyente = false;
				}
			});
		}
	}

	onPatchValue = (): void => {
		this.form.patchValue({
			tipoSerie: "01",
			docIdentidad: "6",
			controlTipoTransporte: "02",
			controlRetornos : "r1",
			controlVehiculos : "v1",
			unidadMedidaTotal: "U",
			controlDNIConductor: '1'
			// TO DO
			//controlPartidaDepartamento: '3926',
			//controlLlegadaDepartamento: '3926'
		});
	}

	onSubmit = async () => {
		if (!this.form.valid) {
			markFormGroupTouched(this.form);

			this.showSpinner = true;
			await new Promise((f: any) => setTimeout(f, 1000));
			this.showSpinner = false;
			console.log("Presionó el botón de submit");
		}
	}
	ruc: string = "";

	ngOnDestroy(): void {
	}

	completeCorrelativo = (): void => {
		const inputFieldControl = this.form.get('numSerieCorrelativo');
		//let numCorr = this.form.controls['numSerieCorrelativo'].value;
		if (inputFieldControl != null) {
			let numComplete = this.completeWithZeros(inputFieldControl?.value, 8);

			this.form.patchValue({
				numSerieCorrelativo: numComplete
			});
		}
	}
	completeWithZeros = (number: string, total: number): string => {
		const zerosToAdd = total - number.length;
		if (zerosToAdd <= 0) {
			return number;
		}

		const zeros = '0'.repeat(zerosToAdd);
		return zeros + number;
	}
	/*
	completeWithZeros = (number: string, total: number): string => {
		let result = "";
		if (number != null) {
			const difference = total - number.length;
			const zeros:string = "";
			if (difference <= 0) {
				result = `${'0'.repeat(difference)}${number}`;
				console.log('difference: ' + difference);
				console.log('number: ' + number);
				console.log('result: ' + result);
			} else {
				result = number.slice(difference);
				console.log('difference: ' + difference);
				console.log('number: ' + number);
				console.log('result: ' + result);
			}
		}

		return result;
	}*/

	onChangeDepartamentoPartida = () => {
		const value = this.form.get('controlPartidaDepartamento');
		this.provinciasPartida = this.locationService.getProvincia(value?.value);
		this.distritosPartida = [];
	}

	onChangeProvinciaPartida = () => {
		const value = this.form.get('controlPartidaProvincia');
		this.distritosPartida = this.locationService.getDistrito(value?.value);
	}

	onChangeDepartamentoLlegada = () => {
		const value = this.form.get('controlLlegadaDepartamento');
		this.provinciasLlegada = this.locationService.getProvincia(value?.value);
		this.distritosLlegada = [];
	}

	onChangeProvinciaLlegada = () => {
		const value = this.form.get('controlLlegadaProvincia');
		this.distritosLlegada = this.locationService.getDistrito(value?.value);
	}
}
