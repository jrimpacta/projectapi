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
		{ value: 1, label: "Traslado por Venta" },
		{ value: 2, label: "Venta sujeta a confirmación del comprador" },
		{ value: 3, label: "Traslado por compra" },
		{ value: 4, label: "Traslado entre establecimientos de la misma empresa" },
		{ value: 5, label: "Traslado emisor itinerante CP" },
		{ value: 6, label: "Traslado por importación" },
		{ value: 7, label: "Traslado por exportación" },
		{ value: 8, label: "Traslado a zona primaria" },
		{ value: 9, label: "Otros" }
	]
};
