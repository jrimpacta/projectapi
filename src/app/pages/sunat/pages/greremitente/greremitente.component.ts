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
	agregarVehiculo : boolean = false;
	agregarConductor : boolean = false;

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
			docIdentidad: "6",
			controlTipoTransporte: "02",
			controlRetornos: "r1",
			controlVehiculos: "v1",
			unidadMedidaTotal: "U",
			controlDNIConductor: '1'
			// TO DO
			//controlPartidaDepartamento: '3926',
			//controlLlegadaDepartamento: '3926'
		});
	}

	onSubmit = async () => {
		//if (this.form.valid) { just for test
		if (!this.form.valid) {
			markFormGroupTouched(this.form);

			this.showSpinner = true;
			await new Promise((f: any) => setTimeout(f, 350));
			this.showSpinner = false;

			console.log(this.form.value);

			const _fechaEmision = new Date(this.form.get('controlFechaEmision')?.value).toISOString();
			const _fechaInicioTraslado = new Date(this.form.get('controlEntregaTransportista')?.value).toISOString();

			// contribuyenteDetailsSignal
			const destinatarioDTO : Contribuyente = {codigoIdentificacion: "", nombreLegal: "", tipoDocumentoIdentidadId: 1, ubigeoId: 1};
			if (this.form.get('controlFechaEmision')?.value != null || this.form.get('controlFechaEmision')?.value != "")
            {
                destinatarioDTO.codigoIdentificacion = this.contribuyenteDetailsSignal().ruc;
                destinatarioDTO.tipoDocumentoIdentidadId = 4;
                destinatarioDTO.nombreComercial = null;
                destinatarioDTO.nombreLegal = this.contribuyenteDetailsSignal().razon_social;
                destinatarioDTO.ubigeoId = 1;
                destinatarioDTO.direccion = this.contribuyenteDetailsSignal().direccion;
                destinatarioDTO.urbanizacion = null;
                destinatarioDTO.provincia = this.contribuyenteDetailsSignal().provincia;
                destinatarioDTO.departamento = this.contribuyenteDetailsSignal().departamento;
                destinatarioDTO.distrito = this.contribuyenteDetailsSignal().distrito;
                destinatarioDTO.pais = this.contribuyenteDetailsSignal().ubigeo;
                destinatarioDTO.correoElectronico = null;
                destinatarioDTO.registroMTC = null;
                destinatarioDTO.licenciaConducir = null
			}

			const guia: Order = {
				fechaEmision : _fechaEmision,
				horaEmision : null,
				firmaDigital : null,
				remitente : {
					codigoIdentificacion : "20474666876",
                    tipoDocumentoIdentidadId: 2,
                    nombreComercial: "Asociación Civil Impacta Salud Y Educación",
                    nombreLegal: "ASOCIACION CIVIL IMPACTA SALUD Y EDUCACION",
                    ubigeoId: 1252,
                    direccion: "AV. GRAU ALMIRANTE MIGUEL NRO. 1010",
                    urbanizacion: "string",
                    provincia: "LIMA",
                    departamento: "LIMA",
                    distrito: "BARRANCO",
                    pais: "PERU",
                    correoElectronico: "string",
                    registroMTC: "string",
                    licenciaConducir: "string"
				},
                tipoDocumentoId : 2,
                destinatario : destinatarioDTO,
                transportista : {
                    codigoIdentificacion : "",
                    tipoDocumentoIdentidadId: 2,
                    nombreComercial: "string",
                    nombreLegal: "string",
                    ubigeoId: 55,
                    direccion: "string",
                    urbanizacion: "string",
                    provincia: "string",
                    departamento: "string",
                    distrito: "string",
                    pais: "string",
                    correoElectronico: "string",
                    registroMTC: "string",
                    licenciaConducir: "string"
				},
                serieCorrelativo: {
                    fechaCreacion: "2023-09-18T06:21:54.785Z",
                    serieCorrelativo: "string",
                    serie: "string",
                    descripcion: "string",
                    contadorCorrelativo: 1,
                },
                unidadMedidaPesoBrutoId: 10,
                pesoBrutoTotalCarga: 120,
                numeroDAMoDS: "string",
                numeroContenedor: "string",
                numeroBultos: "string",
                numeroPrecinto: "string",
                motivoTrasladoId: 8,
                motivoTrasladoOtros: "string",
                indicadorTransbordoProgramado: false,
                puntoPartida : {
                    departamento: "string",
                    provincia: "string",
                    distrito: "string",
                    ubigeoId: 55,
                    direccionCompleta: "string",
                    codigoEstablecimiento: "string",
				},
                puntoLlegada : {
                    departamento: "string",
                    provincia: "string",
                    distrito: "string",
                    ubigeoId: 55,
                    direccionCompleta: "string",
                    codigoEstablecimiento: "string",
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
                        nroPlacaVehiculo: "string",
                        tuCoCHV: "string",
                        autorizacionEspecial: "string",
                        marcaVehiculo: "string",
                        entidadEmisora: "string",
					}
				],
                conductores: [
                    {
                        codigoIdentificacion : "",
                        tipoDocumentoIdentidadId: 2,
                        nombreComercial: "string",
                        nombreLegal: "string",
                        ubigeoId: 55,
                        direccion: "string",
                        urbanizacion: "string",
                        provincia: "string",
                        departamento: "string",
                        distrito: "string",
                        pais: "string",
                        correoElectronico: "string",
                        registroMTC: "string",
                        licenciaConducir: "string"
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
				]
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
