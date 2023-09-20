export interface EmisionSunat {
	fechaEmisionSunat?: string | null;
	enviadoSunat?: boolean | null;
	borrador?: boolean | null;
	enviadoEmailAdmin?: boolean | null;
	enviadoEmailCliente?: boolean | null;
	estadoSunat?: string | null;
	cdrSunat?: string | null;
	eliminado?: boolean | null;
	anulado?: boolean | null;
	envioAutomatico?: boolean | null;
	comunicacionBaja?: boolean | null;
	motivoBaja?: string | null;
	numeroTicket?: string | null;
	xmlFirmado?: string | null;
	codigoQR?: string | null;
}
