export interface SerieCorrelativo {
	fechaCreacion: string;
	serieCorrelativo: string;
	serieId: string;
	descripcion: string;
	contadorCorrelativo: number;
}

export enum Serie {
	App = "App Emprender",
	Portal = "Portal sol",
	API = "API REST"
}
