import { catalogo } from "../../catalogos/catalogo";

export interface Contribuyente {
    id: number;
    codigoIdentificacion: string;
    tipoDocumentoIdentidad: catalogo;
    nombreComercial: string;
    nombreLegal: string;
    ubigeo: string;
    direccion: string;
    urbanizacion: string;
    provincia: string;
    departamento: string;
    distrito: string;
    pais: string;
    correoElectronico: string;
    registroMTC: string;
    licenciaConducir: string; 
}

export interface ContribuyenteDTO {
    codigoIdentificacion: string;
    tipoDocumentoIdentidad: catalogo;
    nombreComercial: string;
    nombreLegal: string;
    ubigeo: string;
    direccion: string;
    urbanizacion: string;
    provincia: string;
    departamento: string;
    distrito: string;
    pais: string;
    correoElectronico: string;
    registroMTC: string;
    licenciaConducir: string; 
}