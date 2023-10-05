import {Component, inject, OnDestroy, OnInit, signal} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ControlItem} from "src/app/models/frontend";
import {markFormGroupTouched, regex, regexErrors} from 'src/app/shared/utils';
import {NotificationService, SunatService, ContribuyenteService} from 'src/app/services';
import {catalogo06, catalogo18, catalogo20, catalogo65} from "src/app/models/backend/catalogos";
import {emisores} from "src/app/models/backend/gobierno";
import {serieCorrelativo} from "src/app/models/backend/documentos";
import {ThemePalette} from '@angular/material/core';
import {departamentosBadWay} from "src/app/models/backend/ubigeo";

import {LocationService} from "src/app/services/utils/location.service";

//import {doc, setDoc, Timestamp} from "firebase/firestore";
import {initializeApp} from "@angular/fire/app";
import {environment} from "../../../../../environments/environment";
import {collection, getFirestore} from "@angular/fire/firestore";

import {ContribuyenteDTO} from 'src/app/models/backend/cpe/gre';
import {Contribuyente, Order} from "src/app/models/backend/api";

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


	form!: FormGroup;
	isInline!: boolean;
	regexErrors = regexErrors;
	showSpinner = false;
	showSpinnerRUC = false;
	showSpinnerContribuyente = false;
	showSpinnerTransportista = false;
	showSpinnerConductor = false;

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
	notification: NotificationService = inject(NotificationService);
	locationService: LocationService = inject(LocationService);
	contribuyenteService: ContribuyenteService = inject(ContribuyenteService);

	// Variables de conductor y vehículo
	agregarVehiculo: boolean = false;
	agregarConductor: boolean = false;

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
			}], controlFechaEmision: [Date.now(), {
				updateOn: 'change',
				validators: [
					Validators.required
				]
			}], controlEntregaTransportista: [Date.now(), { // Date
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
				] // controlVehiculoMarca
			}],
			controlVehiculoEmisor: [null, {
				updateOn: 'change',
				validators: []
			}],
			controlVehiculoMarca: [null, {
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
				validators: [] // controlConductorLicencia
			}], controlConductorLicencia: [null, {
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
			}], controlPesoBrutoTotal: [null, {
				updateOn: 'blur',
				validators: []
			}]
		});

		this.onRUCMatch();

		this.onTransportistaMatch();
		this.onConductorMatch();
		this.onPatchValue();
	}

	contribuyenteDetailsSignal = signal<any>({});
	isLoadedDestinatarioSignal = signal<boolean>(false);
	transportistaDetailsSignal = signal<any>({});
	chipsContribuyente: boolean = false;
	chipsTransportista: boolean = false;

	// Para destinatario
	onRUCMatch = async () => {
		const inputFieldControl = this.form.get('docContribuyente');
		if (inputFieldControl) {
			inputFieldControl.valueChanges.subscribe(async (value) => {
				if (value && value.length === 11) {

					try {
						this.showSpinnerContribuyente = true;
						const response: any = await this.sunatService.getRUCDataAsync(value);
						this.isLoadedDestinatarioSignal.set(true);

						console.log('La consulta terminó. : ' + JSON.stringify(response));
						this.contribuyenteDetailsSignal.set(response);

						this.form.patchValue({
							nomContribuyente: response.razon_social,
							controlLlegadaPunto: response.direccion
						});
						this.chipsContribuyente = true;

					} catch (err) {
						console.error(`Detalle del error: ${err}`);
						this.isLoadedDestinatarioSignal.set(false);
						this.notification.error(`No se encontraron datos para: ${value}`);
					} finally {
						this.showSpinnerContribuyente = false;
						console.log('La consulta terminó por completo.');
					}

				} else {
					this.chipsContribuyente = false;
				}
			});
		}
	}

	// Para transportista
	onTransportistaMatch = async () => {
		const inputFieldControl = this.form.get('controlRUCTransportista');
		if (inputFieldControl) {
			inputFieldControl.valueChanges.subscribe(async (value) => {
				if (value && value.length === 11) {

					try {
						this.showSpinnerTransportista = true;
						const response: any = await this.sunatService.getRUCDataAsync(value);

						console.log('La consulta terminó. : ' + JSON.stringify(response));
						this.transportistaDetailsSignal.set(response);

						this.form.patchValue({
							controlNomTransportista: response.razon_social
						});
						this.chipsTransportista = true;

					} catch (err) {
						console.error(`Detalle del error: ${err}`);
						this.isLoadedDestinatarioSignal.set(false);
						this.notification.error(`No se encontraron datos para: ${value}`);
					} finally {
						this.showSpinnerTransportista = false;
						console.log('La consulta terminó por completo.');
					}

				} else {
					this.chipsContribuyente = false;
				}
			});
		}
	}

	onConductorMatch = async () => {
		const inputFieldControl = this.form.get('controlDocConductor');
		if (inputFieldControl) {
			inputFieldControl.valueChanges.subscribe(async (value) => {
				if (value && value.length === 8) {

					try {
						this.showSpinnerConductor = true;
						const response: any = await this.sunatService.getDNIDataAsync(value);

						this.form.patchValue({
							controlNombreConductor: response.cliente
						});

					} catch (err) {
						console.error(`Detalle del error: ${err}`);
						this.notification.error(`No se encontraron datos para: ${value}`);
					} finally {
						this.showSpinnerConductor = false;
						console.log('La consulta terminó por completo.');
					}

				} else {
					this.chipsContribuyente = false;
				}
			});
		}
	}

	onPatchValue = (): void => {
		this.form.patchValue({
			tipoSerie: "01",
			docIdentidad: 4,
			controlTipoTransporte: 1,
			unidadMedidaTotal: "U",
			controlDNIConductor: 2
			// TO DO
			//controlPartidaDepartamento: '3926',
			//controlLlegadaDepartamento: '3926'
		});
	}

	onSubmit = async () => {
		if (!this.form.valid) {
			markFormGroupTouched(this.form);

			this.showSpinner = true;
			await new Promise((f: any) => setTimeout(f, 350));
			this.showSpinner = false;

			console.log(this.form.value);

			const _fechaEmision = new Date(this.form.get('controlFechaEmision')?.value).toISOString();
			const _fechaInicioTraslado = new Date(this.form.get('controlEntregaTransportista')?.value).toISOString();
			let retornos = [];

			switch (this.form.get('controlFechaEmision')?.value) {
				case "r1": { // Retorno de Vehículo Vacío
					retornos = [true, false, false]
					break;
				}
				case "r2": { // Retorno con Envases Vacíos
					retornos = [false, true, false]
					break;
				}
				case "r3": { // Transbordo Programado
					retornos = [false, false, true]
					break;
				}
				default: {
					retornos = [false, false, false];
					break;
				}
			}

			const guia: Order = {
				fechaEmision: _fechaEmision,
				horaEmision: null,
				firmaDigital: null,
				remitente: {
					codigoIdentificacion: "20474666876",
					tipoDocumentoIdentidadId: 4,
					nombreComercial: "Asociación Civil Impacta Salud Y Educación",
					nombreLegal: "ASOCIACION CIVIL IMPACTA SALUD Y EDUCACION",
					ubigeoId: 1252,
					direccion: "AV. GRAU ALMIRANTE MIGUEL NRO. 1010",
					urbanizacion: "",
					provincia: "LIMA",
					departamento: "LIMA",
					distrito: "BARRANCO",
					pais: "PERU",
					correoElectronico: "",
					registroMTC: "",
					licenciaConducir: ""
				},
				tipoDocumentoId: 2,
				destinatario: {
					codigoIdentificacion: this.form.get('docContribuyente')?.value,
					tipoDocumentoIdentidadId: Number(this.form.get('docIdentidad')?.value),
					nombreComercial: "",
					nombreLegal: this.form.get('nomContribuyente')?.value,
					ubigeoId: 1,
					direccion: this.contribuyenteDetailsSignal().direccion,
					urbanizacion: "",
					provincia: this.contribuyenteDetailsSignal().provincia,
					departamento: this.contribuyenteDetailsSignal().departamento,
					distrito: this.contribuyenteDetailsSignal().distrito,
					pais: this.contribuyenteDetailsSignal().ubigeo,
					correoElectronico: "",
					registroMTC: "",
					licenciaConducir: ""
				},
				transportista: {
					codigoIdentificacion: this.form.get('controlRUCTransportista')?.value,
					tipoDocumentoIdentidadId: 4,
					nombreComercial: "",
					nombreLegal: this.form.get('controlNomTransportista')?.value,
					ubigeoId: 1,
					direccion: this.transportistaDetailsSignal().direccion,
					urbanizacion: "",
					provincia: this.transportistaDetailsSignal().provincia,
					departamento: this.transportistaDetailsSignal().departamento,
					distrito: this.transportistaDetailsSignal().distrito,
					pais: this.transportistaDetailsSignal().ubigeo,
					correoElectronico: "",
					registroMTC: "",
					licenciaConducir: ""
				},
				serieCorrelativo: {
					fechaCreacion: new Date().toISOString(),
					serieCorrelativo: "",
					serie: "",
					descripcion: "",
					contadorCorrelativo: 1,
				},
				unidadMedidaPesoBrutoId: Number(this.form.get('unidadMedidaTotal')?.value),
				pesoBrutoTotalCarga: Number(this.form.get('controlPesoBrutoTotal')?.value),
				numeroDAMoDS: "",
				numeroContenedor: "",
				numeroBultos: "",
				numeroPrecinto: "",
				motivoTrasladoId: 8,
				motivoTrasladoOtros: "",
				indicadorTransbordoProgramado: false,
				puntoPartida: {
					departamento: "",
					provincia: "",
					distrito: "",
					ubigeoId: 55,
					direccionCompleta: this.form.get('controlPartidaPunto')?.value,
					codigoEstablecimiento: "",
				},
				puntoLlegada: {
					departamento: "",
					provincia: "",
					distrito: "",
					ubigeoId: 55,
					direccionCompleta: this.form.get('controlLlegadaPunto')?.value,
					codigoEstablecimiento: "",
				},
				fechaInicioTraslado: _fechaInicioTraslado,
				codigoPuertoOAeropuerto: null,
				orderDetails: [
					{
						productId: 0,
						unitPrice: 0,
						quantity: 0
					}
				],
				vehiculos: [
					{
						nroPlacaVehiculo: this.form.get('controlVehiculoPlaca')?.value,
						tuCoCHV: this.form.get('controlVehiculoHabilitacion')?.value,
						autorizacionEspecial: this.form.get('controlVehiculoAutorizacion')?.value,
						marcaVehiculo: this.form.get('controlVehiculoMarca')?.value,
						entidadEmisora: this.form.get('controlVehiculoEmisor')?.value,
					}
				],
				conductores: [
					{
						codigoIdentificacion: this.form.get('controlDocConductor')?.value,
						tipoDocumentoIdentidadId: 2,
						nombreComercial: "",
						nombreLegal: this.form.get('controlNombreConductor')?.value,
						ubigeoId: 1,
						direccion: "",
						urbanizacion: "",
						provincia: "",
						departamento: "",
						distrito: "",
						pais: "",
						correoElectronico: "",
						registroMTC: "",
						licenciaConducir: this.form.get('controlConductorLicencia')?.value
					}
				],
				documentoRelacionado: null,
				indicadorTrasladoVehículosCategoríaM1oL: false,
				indRegistrarVehiculosConductoresDelTransportista: false,
				indicadorTrasladoTotalMercanciasDAMoDS: false,
				transbordo: false,
				observaciones: [
					{
						detalle: "Sin detalles"
					}
				],
				emisionSunat: {
					fechaEmisionSunat: null,
					enviadoSunat: false,
					borrador: null, // Depende del botón Guardar | Enviar
					enviadoEmailAdmin: false,
					enviadoEmailCliente: false,
					estadoSunat: null,
					cdrSunat: null,
					eliminado: null,
					anulado: null,
					envioAutomatico: null,
					comunicacionBaja: false,
					motivoBaja: null,
					numeroTicket: null,
					xmlFirmado: null,
					codigoQR: null
				}
			};

			console.log(guia);
			const response = this.contribuyenteService.add(guia);
			console.log("resultado: " + JSON.stringify(response));

		} else {
			this.notification.error(`Debe completar los campos requeridos antes de enviar.`);
		}
	}
	app = initializeApp(environment.firebase.config);
	db = getFirestore(this.app);
	userProfileCollection = collection(getFirestore(this.app), 'test');

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

	onVehiculoAgreggate = () => {
		this.agregarVehiculo = !this.agregarVehiculo;
	}

	onConductorAgreggate = () => {
		this.agregarConductor = !this.agregarConductor;
	}
}
