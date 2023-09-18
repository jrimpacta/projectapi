import {Contribuyente} from "./contribuyente";
import {SerieCorrelativo} from "./serieCorrelativo";
import {Direccion} from "./direccion";
import {Vehiculo} from "./vehiculo";
import {Observacion} from "./observacion";
export interface Order {
	fechaEmision: string;
	horaEmision?: string;
	firmaDigital?: string;
	remitente: Contribuyente;
	tipoDocumentoId: number;
	destinatario: Contribuyente;
	transportista: Contribuyente;
	serieCorrelativo?: SerieCorrelativo; // TO DO
	unidadMedidaPesoBrutoId: number;
	pesoBrutoTotalCarga: number;
	numeroDAMoDS?: string;
	numeroContenedor?: string;
	numeroBultos?: string;
	numeroPrecinto?: string;
	motivoTrasladoId: number;
	motivoTrasladoOtros: string;
	indicadorTransbordoProgramado: boolean;
	puntoPartida: Direccion;
	puntoLlegada: Direccion;
	fechaInicioTraslado: string;
	codigoPuertoOAeropuerto?: string;
	orderDetails: any[]; // Ajusta esta definición según la estructura real
	vehiculos: Vehiculo[];
	conductores: Contribuyente[];
	documentoRelacionado?: number; // Ajusta esta definición según la estructura real
	indicadorTrasladoVehículosCategoríaM1oL: boolean;
	indRegistrarVehiculosConductoresDelTransportista: boolean;
	indicadorTrasladoTotalMercanciasDAMoDS: boolean;
	transbordo: boolean;
	observaciones: Observacion[];
}
