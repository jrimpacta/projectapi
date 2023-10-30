import {Component, inject, OnDestroy, OnInit, signal} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ControlItem} from "src/app/models/frontend";
import {markFormGroupTouched, regex, regexErrors} from 'src/app/shared/utils';
import {NotificationService, SunatService, ContribuyenteService} from 'src/app/services';
import {catalogo06, catalogo18, catalogo20, catalogo65} from "src/app/models/backend/catalogos";
import {emisores} from "src/app/models/backend/gobierno";
import {SeriesCorrelativo} from "src/app/models/backend/documentos";
import {ThemePalette} from '@angular/material/core';

import {LocationService} from "src/app/services/utils/location.service";

//import {doc, setDoc, Timestamp} from "firebase/firestore";
import {initializeApp} from "@angular/fire/app";
import {environment} from "../../../../../environments/environment";
import {collection, getFirestore} from "@angular/fire/firestore";

import {ContribuyenteDTO} from 'src/app/models/backend/cpe/gre';
import {Contribuyente, DocumentoRelacionado, Order, Serie, Vehiculo} from "src/app/models/backend/api";
import {Subscription, switchScan} from "rxjs";
import {Departamentos} from "../../../../models/backend/ubigeo";
import {ProductoService} from "../../services/producto.service";
import {ProductoItem} from "../../../../models/backend/api/productoItem";

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
	itemsExists: boolean = false;
    items!:ProductoItem[];
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
    itemService:ProductoService = inject(ProductoService);

	// Variables de conductor y vehículo
	agregarVehiculo: boolean = false;
	agregarConductor: boolean = false;

	constructor(private fb: FormBuilder) {

		this.isInline = false;

		this.serieCorrelativo = SeriesCorrelativo;
		this.motivos = catalogo20.items;
		this.documentosIdentidad = catalogo06.items;
		this.emisores = emisores;
		this.unidadMedida = catalogo65.items;

		this.departamentosPartida = Departamentos;
		this.departamentosLlegada = Departamentos;
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

    private  itemSubscription! : Subscription;
	ngOnInit(): void {
		this.form = this.fb.group({
			tipoSerie: [null, {
				updateOn: 'change',
				validators: []
			}], numSerieCorrelativo: [null, {
				updateOn: ''
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
				validators: []
			}], controlNumBultos: [null, {
				updateOn: 'change'
			}], controlVehiculos: [null, {
				validators: []
			}], controlMotivos: [null, {
				updateOn: 'change',
				validators: [
					Validators.minLength(4),
					Validators.maxLength(500),
					Validators.required
				]
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
			}], controlDocRelacionado: [null, {
				updateOn: 'blur',
				validators: []
			}], controlNumPrecinto: [null, {
				updateOn: 'blur',
				validators: []
			}], controlObservacion: [null, {
				updateOn: 'blur',
				validators: []
			}]
		});

		this.onRUCMatch();

		this.onTransportistaMatch();
		this.onConductorMatch();
		this.onPatchValue();

        this.items = this.itemService.getItems();

        this.itemSubscription = this.itemService.itemsSubject.subscribe( () => {
            this.items = this.itemService.getItems();
        } );
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
			tipoSerie: 6,
			docIdentidad: 4,
			controlTipoTransporte: 1,
			unidadMedidaTotal: 90,
			controlDNIConductor: 2
			// TO DO
			//controlPartidaDepartamento: '3926',
			//controlLlegadaDepartamento: '3926'
		});
	}

	onSubmit = async () => {
		if (this.form.valid) {
			markFormGroupTouched(this.form);

			this.showSpinner = true;
			await new Promise((f: any) => setTimeout(f, 350));
			this.showSpinner = false;

			console.log(this.form.value);

			const _fechaEmision = new Date(this.form.get('controlFechaEmision')?.value).toISOString();
			const _fechaInicioTraslado = new Date(this.form.get('controlEntregaTransportista')?.value).toISOString();
			let retornos = [];

			switch (this.form.get('controlRetornos')?.value) {
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

			let vehiculos = [];
			switch (this.form.get('controlVehiculos')?.value) {
				case "v1": { // Retorno de Vehículo Vacío
					vehiculos = [true, false, false]
					break;
				}
				case "v2": { // Retorno con Envases Vacíos
					vehiculos = [false, true, false]
					break;
				}
				case "v3": { // Transbordo Programado
					vehiculos = [false, false, true]
					break;
				}
				default: {
					vehiculos = [false, false, false];
					break;
				}
			}

			let tipoSerie : string = "";
			switch (this.form.get('tipoSerie')?.value) {
				case 'EG02': case 'EG06': {
					tipoSerie = Serie.App;
					break;
				}
				case 'EG05': case 'EG07': {
					tipoSerie = Serie.Portal;
					break;
				}
				default: {
					tipoSerie = Serie.API;
					break;
				}
			}

			let drelValue = this.form.get('controlDocRelacionado')?.value;
			let docRelacionado : DocumentoRelacionado | null;

			console.log(drelValue);
			if (drelValue != null) {
				docRelacionado = {
					NroDocumento: drelValue,
					TipoDocumentoId: 4,
					IdentificadorPago: ''
				};
			} else {
				docRelacionado = null;
			}

			let conductores : Contribuyente[] = [];
			let vehiculosData : Vehiculo[] = [];

			if (vehiculos[2]) {
				conductores.push( {
					codigoIdentificacion: this.form.get('controlDocConductor')?.value,
					tipoDocumentoIdentidadId: this.form.get('controlDNIConductor')?.value,
					nombreComercial: "",
					nombreLegal: this.form.get('controlNombreConductor')?.value,
					ubigeoId: "",
					direccion: "",
					urbanizacion: "",
					provincia: "",
					departamento: "",
					distrito: "",
					pais: "",
					correoElectronico: "",
					registroMTC: "",
					licenciaConducir: this.form.get('controlConductorLicencia')?.value
				});

				vehiculosData.push({
					nroPlacaVehiculo: this.form.get('controlVehiculoPlaca')?.value,
					tuCoCHV: this.form.get('controlVehiculoHabilitacion')?.value,
					autorizacionEspecial: this.form.get('controlVehiculoAutorizacion')?.value,
					marcaVehiculo: this.form.get('controlVehiculoMarca')?.value,
					entidadEmisora: this.form.get('controlVehiculoEmisor')?.value
				});
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
					ubigeoId: '150104',
					direccion: "AV. GRAU, ALMIRANTE MIGUEL NR O. 1010",
					urbanizacion: "",
					provincia: "LIMA",
					departamento: "LIMA",
					distrito: "BARRANCO",
					pais: "PERU",
					correoElectronico: "",
					registroMTC: "",
					licenciaConducir: ""
				},
				tipoDocumentoId: 6, // GRE Remitente
				destinatario: {
					codigoIdentificacion: this.form.get('docContribuyente')?.value,
					tipoDocumentoIdentidadId: Number(this.form.get('docIdentidad')?.value),
					nombreComercial: "",
					nombreLegal: this.form.get('nomContribuyente')?.value,
					ubigeoId: this.contribuyenteDetailsSignal().ubigeo,
					direccion: this.contribuyenteDetailsSignal().direccion,
					urbanizacion: "",
					provincia: this.contribuyenteDetailsSignal().provincia,
					departamento: this.contribuyenteDetailsSignal().departamento,
					distrito: this.contribuyenteDetailsSignal().distrito,
					pais: "",
					correoElectronico: "",
					registroMTC: "",
					licenciaConducir: ""
				},
				transportista: {
					codigoIdentificacion: this.form.get('controlRUCTransportista')?.value,
					tipoDocumentoIdentidadId: 4, // Siempre RUC
					nombreComercial: "",
					nombreLegal: this.form.get('controlNomTransportista')?.value,
					ubigeoId: this.transportistaDetailsSignal().ubigeo,
					direccion: this.transportistaDetailsSignal().direccion,
					urbanizacion: "",
					provincia: this.transportistaDetailsSignal().provincia,
					departamento: this.transportistaDetailsSignal().departamento,
					distrito: this.transportistaDetailsSignal().distrito,
					pais: "",
					correoElectronico: "",
					registroMTC: this.form.get('controlMTCTransportista')?.value,
					licenciaConducir: ""
				},
				serieCorrelativo: { // Se debe contar los documentos aceptados por sunat y sumar uno
					fechaCreacion: new Date().toISOString(),
					serieCorrelativo: `${this.form.get('tipoSerie')?.value}-${this.form.get('numSerieCorrelativo')?.value}`,
					serieId: this.form.get('tipoSerie')?.value,
					descripcion: tipoSerie,
					contadorCorrelativo: 1, // TO DO
				},
				unidadMedidaPesoBrutoId: Number(this.form.get('unidadMedidaTotal')?.value),
				pesoBrutoTotalCarga: Number(this.form.get('controlPesoBrutoTotal')?.value),
				numeroDAMoDS: "", // La empresa no lo necesita
				numeroContenedor: "", // La empresa no lo necesita
				numeroBultos: this.form.get('controlNumBultos')?.value,
				numeroPrecinto: this.form.get('controlNumPrecinto')?.value,
				motivoTrasladoId: this.form.get('controlMotivos')?.value,
				motivoTrasladoOtros: "", // TO DO

				puntoPartida: {
					departamento: this.form.get('controlPartidaDepartamento')?.value,
					provincia: this.form.get('controlPartidaProvincia')?.value,
					distrito: this.form.get('controlPartidaDistrito')?.value,
					ubigeoId: this.form.get('controlPartidaDistrito')?.value,
					direccionCompleta: this.form.get('controlPartidaPunto')?.value,
					codigoEstablecimiento: "",
				},
				puntoLlegada: {
                    departamento: this.form.get('controlLlegadaDepartamento')?.value,
                    provincia: this.form.get('controlLlegadaProvincia')?.value,
                    distrito: this.form.get('controlLlegadaDistrito')?.value,
                    ubigeoId: this.form.get('controlLlegadaDistrito')?.value,
					direccionCompleta: this.form.get('controlLlegadaPunto')?.value,
					codigoEstablecimiento: "",
				},
				fechaInicioTraslado: _fechaInicioTraslado,
				codigoPuertoOAeropuerto: null, // La empresa no lo necesita
				orderDetails: this.items,
				vehiculos: vehiculosData,
				conductores: conductores,
				documentoRelacionado: docRelacionado,
				indicadorTrasladoVehículosCategoríaM1oL: vehiculos[0],
				indicadorTrasladoTotalMercanciasDAMoDS: vehiculos[1],
				indRegistrarVehiculosConductoresDelTransportista: vehiculos[2],
				transbordo: retornos[2],
				observaciones: [
					{
						detalle: this.form.get('controlObservacion')?.value
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
				},
				indicadorRetornoEnvasesVacios: retornos[0],
				indicadorRetornoVehiculoVacio: retornos[1],
				indicadorTransbordoProgramado: retornos[2]
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
        this.itemSubscription.unsubscribe();
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
		const value = this.form.get('controlPartidaDepartamento')?.value;
		this.provinciasPartida = this.locationService.getProvincias(value);
		this.distritosPartida = [];
	}

	onChangeProvinciaPartida = () => {
		const value = this.form.get('controlPartidaProvincia')?.value;
		this.distritosPartida = this.locationService.getDistritos(value);
	}

	onChangeDepartamentoLlegada = () => {
		const value = this.form.get('controlLlegadaDepartamento')?.value;
		this.provinciasLlegada = this.locationService.getProvincias(value);
		this.distritosLlegada = [];
	}

	onChangeProvinciaLlegada = () => {
		const value = this.form.get('controlLlegadaProvincia')?.value;
		this.distritosLlegada = this.locationService.getDistritos(value);
	}

	onVehiculoAgreggate = () => {
		this.agregarVehiculo = !this.agregarVehiculo;
	}

	onConductorAgreggate = () => {
		this.agregarConductor = !this.agregarConductor;
	}

	AddItem = () => {
		this.itemsExists = true;
	}

	showVehiculosControls: boolean = false;
	HideControls = () => {
		let value = this.form.get("controlVehiculos")?.value;
		this.showVehiculosControls = value == 'v3';
	}
}
