import { ControlItem } from "../../frontend";
interface Catalogo20 {
	items: ControlItem[];
}

/*
* Catálogo No. 20: Códigos – Motivos de Traslado
* Campo:
* ext:UBLExtensions/ext:UBLExtension/ext:ExtensionContent/sac:AdditionalInformation/sac:SUNAT
* EmbededDespatchAdvice/cac:Shipment/cbc:ShippingPriorityLevelCode
* Descripción:
* Motivos de Traslado
* Catálogo: SUNAT
* Cuando el motivo de traslado es "02", "04" o "07" del catálogo N.° 20 del anexo N.° 8. Se debe
* ingresar el tipo y el número del documento de identidad del remitente.
* */
export const catalogo20: Catalogo20 = {
	items: [
		{ value: '01', label: "Traslado por Venta" },
		{ value: '14', label: "Venta sujeta a confirmación del comprador" },
		{ value: '02', label: "Traslado por compra" },
		{ value: '04', label: "Traslado entre establecimientos de la misma empresa" },
		{ value: '18', label: "Traslado emisor itinerante CP" }, // El RUC o el DNI deben ser válidos. Campo lleno, excepto si motivo de traslado es "18"
		{ value: '08', label: "Traslado por importación" },
		{ value: '09', label: "Traslado por exportación" },
		{ value: '19', label: "Traslado a zona primaria" },
		{ value: '13', label: "Otros" },
	]
};
