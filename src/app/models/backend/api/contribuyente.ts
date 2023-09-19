export interface Contribuyente {
	codigoIdentificacion: string;
	tipoDocumentoIdentidadId: number;
	nombreComercial?: string | null;
	nombreLegal: string;
	ubigeoId: number;
	direccion?: string | null;
	urbanizacion?: string | null;
	provincia?: string | null;
	departamento?: string | null;
	distrito?: string | null;
	pais?: string | null;
	correoElectronico?: string | null;
	registroMTC?: string | null;
	licenciaConducir?: string | null;
}
