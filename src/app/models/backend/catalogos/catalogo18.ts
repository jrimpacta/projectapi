import { ControlItem } from "../../frontend";
interface Catalogo18 {
	items: ControlItem[];
}

/*
* Catálogo No. 18: Códigos – Modalidad de Traslado
* Campo:
* /Invoice/ext:UBLExtensions/ext:UBLExtension/ext:ExtensionContent/sac:AdditionalInformation/sac:S
* UNATEmbededDespatchAdvice/cbc:TransportModeCode
* Descripción:
* Modalidad de traslado
* Catálogo:
* SUNAT
* */
export const catalogo18: Catalogo18 = {
	items: [
		{ value: '01', label: "Transporte público" },
		{ value: '02', label: "Transporte privado" },
	]
};
