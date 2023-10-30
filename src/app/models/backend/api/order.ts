import {Contribuyente} from "./contribuyente";
import {SerieCorrelativo} from "./serieCorrelativo";
import {Direccion} from "./direccion";
import {Vehiculo} from "./vehiculo";
import {Observacion} from "./observacion";
import {OrderDetails} from "./orderDetails";
import {EmisionSunat} from "./EmisionSunat";
import {ProductoItem} from "./productoItem";
import {DocumentoRelacionado} from "./documentoRelacionado";
export interface Order {
	fechaEmision: string;
	horaEmision?: string | null;
	firmaDigital?: string | null;
	remitente: Contribuyente;
	tipoDocumentoId: number;
	destinatario: Contribuyente;
	transportista: Contribuyente;
	serieCorrelativo?: SerieCorrelativo | null; // TO DO
	unidadMedidaPesoBrutoId: number;
	pesoBrutoTotalCarga: number;
	numeroDAMoDS?: string;
	numeroContenedor?: string;
	numeroBultos?: string;
	numeroPrecinto?: string;
	motivoTrasladoId: number;
	motivoTrasladoOtros: string;
	puntoPartida: Direccion;
	puntoLlegada: Direccion;
	fechaInicioTraslado: string;
	codigoPuertoOAeropuerto?: string | null;
	orderDetails: ProductoItem[]; // Ajusta esta definición según la estructura real
	vehiculos: Vehiculo[];
	conductores: Contribuyente[];
	documentoRelacionado?: DocumentoRelacionado | null | undefined; // Ajusta esta definición según la estructura real
	indicadorTrasladoVehículosCategoríaM1oL: boolean;
	indRegistrarVehiculosConductoresDelTransportista: boolean;
	indicadorTrasladoTotalMercanciasDAMoDS: boolean;
	transbordo: boolean;
	observaciones: Observacion[];
 	emisionSunat: EmisionSunat;
	indicadorRetornoEnvasesVacios: boolean;
	indicadorRetornoVehiculoVacio: boolean;
	indicadorTransbordoProgramado: boolean;
}
