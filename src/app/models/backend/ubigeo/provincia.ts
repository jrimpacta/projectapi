import {ControlItem} from "../../frontend";

interface provinciaControlItem { // Bad way
	[key: string]: ControlItem[];
}

interface Provincia {
	id: string,
	name: string,
	department_id: string
}

export const Provincias : Provincia[] = [
	{ "id": "0101", "name": "Chachapoyas", "department_id": "01" },
	{ "id": "0102", "name": "Bagua", "department_id": "01" },
	{ "id": "0103", "name": "Bongar\u00e1", "department_id": "01" },
	{ "id": "0104", "name": "Condorcanqui", "department_id": "01" },
	{ "id": "0105", "name": "Luya", "department_id": "01" },
	{ "id": "0106", "name": "Rodr\u00edguez de Mendoza", "department_id": "01" },
	{ "id": "0107", "name": "Utcubamba", "department_id": "01" },
	{ "id": "0201", "name": "Huaraz", "department_id": "02" },
	{ "id": "0202", "name": "Aija", "department_id": "02" },
	{ "id": "0203", "name": "Antonio Raymondi", "department_id": "02" },
	{ "id": "0204", "name": "Asunci\u00f3n", "department_id": "02" },
	{ "id": "0205", "name": "Bolognesi", "department_id": "02" },
	{ "id": "0206", "name": "Carhuaz", "department_id": "02" },
	{
		"id": "0207",
		"name": "Carlos Ferm\u00edn Fitzcarrald",
		"department_id": "02"
	},
	{ "id": "0208", "name": "Casma", "department_id": "02" },
	{ "id": "0209", "name": "Corongo", "department_id": "02" },
	{ "id": "0210", "name": "Huari", "department_id": "02" },
	{ "id": "0211", "name": "Huarmey", "department_id": "02" },
	{ "id": "0212", "name": "Huaylas", "department_id": "02" },
	{ "id": "0213", "name": "Mariscal Luzuriaga", "department_id": "02" },
	{ "id": "0214", "name": "Ocros", "department_id": "02" },
	{ "id": "0215", "name": "Pallasca", "department_id": "02" },
	{ "id": "0216", "name": "Pomabamba", "department_id": "02" },
	{ "id": "0217", "name": "Recuay", "department_id": "02" },
	{ "id": "0218", "name": "Santa", "department_id": "02" },
	{ "id": "0219", "name": "Sihuas", "department_id": "02" },
	{ "id": "0220", "name": "Yungay", "department_id": "02" },
	{ "id": "0301", "name": "Abancay", "department_id": "03" },
	{ "id": "0302", "name": "Andahuaylas", "department_id": "03" },
	{ "id": "0303", "name": "Antabamba", "department_id": "03" },
	{ "id": "0304", "name": "Aymaraes", "department_id": "03" },
	{ "id": "0305", "name": "Cotabambas", "department_id": "03" },
	{ "id": "0306", "name": "Chincheros", "department_id": "03" },
	{ "id": "0307", "name": "Grau", "department_id": "03" },
	{ "id": "0401", "name": "Arequipa", "department_id": "04" },
	{ "id": "0402", "name": "Caman\u00e1", "department_id": "04" },
	{ "id": "0403", "name": "Caravel\u00ed", "department_id": "04" },
	{ "id": "0404", "name": "Castilla", "department_id": "04" },
	{ "id": "0405", "name": "Caylloma", "department_id": "04" },
	{ "id": "0406", "name": "Condesuyos", "department_id": "04" },
	{ "id": "0407", "name": "Islay", "department_id": "04" },
	{ "id": "0408", "name": "La Uni\u00f2n", "department_id": "04" },
	{ "id": "0501", "name": "Huamanga", "department_id": "05" },
	{ "id": "0502", "name": "Cangallo", "department_id": "05" },
	{ "id": "0503", "name": "Huanca Sancos", "department_id": "05" },
	{ "id": "0504", "name": "Huanta", "department_id": "05" },
	{ "id": "0505", "name": "La Mar", "department_id": "05" },
	{ "id": "0506", "name": "Lucanas", "department_id": "05" },
	{ "id": "0507", "name": "Parinacochas", "department_id": "05" },
	{ "id": "0508", "name": "P\u00e0ucar del Sara Sara", "department_id": "05" },
	{ "id": "0509", "name": "Sucre", "department_id": "05" },
	{ "id": "0510", "name": "V\u00edctor Fajardo", "department_id": "05" },
	{ "id": "0511", "name": "Vilcas Huam\u00e1n", "department_id": "05" },
	{ "id": "0601", "name": "Cajamarca", "department_id": "06" },
	{ "id": "0602", "name": "Cajabamba", "department_id": "06" },
	{ "id": "0603", "name": "Celend\u00edn", "department_id": "06" },
	{ "id": "0604", "name": "Chota", "department_id": "06" },
	{ "id": "0605", "name": "Contumaz\u00e1", "department_id": "06" },
	{ "id": "0606", "name": "Cutervo", "department_id": "06" },
	{ "id": "0607", "name": "Hualgayoc", "department_id": "06" },
	{ "id": "0608", "name": "Ja\u00e9n", "department_id": "06" },
	{ "id": "0609", "name": "San Ignacio", "department_id": "06" },
	{ "id": "0610", "name": "San Marcos", "department_id": "06" },
	{ "id": "0611", "name": "San Miguel", "department_id": "06" },
	{ "id": "0612", "name": "San Pablo", "department_id": "06" },
	{ "id": "0613", "name": "Santa Cruz", "department_id": "06" },
	{ "id": "0701", "name": "Prov. Const. del Callao", "department_id": "07" },
	{ "id": "0801", "name": "Cusco", "department_id": "08" },
	{ "id": "0802", "name": "Acomayo", "department_id": "08" },
	{ "id": "0803", "name": "Anta", "department_id": "08" },
	{ "id": "0804", "name": "Calca", "department_id": "08" },
	{ "id": "0805", "name": "Canas", "department_id": "08" },
	{ "id": "0806", "name": "Canchis", "department_id": "08" },
	{ "id": "0807", "name": "Chumbivilcas", "department_id": "08" },
	{ "id": "0808", "name": "Espinar", "department_id": "08" },
	{ "id": "0809", "name": "La Convenci\u00f3n", "department_id": "08" },
	{ "id": "0810", "name": "Paruro", "department_id": "08" },
	{ "id": "0811", "name": "Paucartambo", "department_id": "08" },
	{ "id": "0812", "name": "Quispicanchi", "department_id": "08" },
	{ "id": "0813", "name": "Urubamba", "department_id": "08" },
	{ "id": "0901", "name": "Huancavelica", "department_id": "09" },
	{ "id": "0902", "name": "Acobamba", "department_id": "09" },
	{ "id": "0903", "name": "Angaraes", "department_id": "09" },
	{ "id": "0904", "name": "Castrovirreyna", "department_id": "09" },
	{ "id": "0905", "name": "Churcampa", "department_id": "09" },
	{ "id": "0906", "name": "Huaytar\u00e1", "department_id": "09" },
	{ "id": "0907", "name": "Tayacaja", "department_id": "09" },
	{ "id": "1001", "name": "Hu\u00e1nuco", "department_id": "10" },
	{ "id": "1002", "name": "Ambo", "department_id": "10" },
	{ "id": "1003", "name": "Dos de Mayo", "department_id": "10" },
	{ "id": "1004", "name": "Huacaybamba", "department_id": "10" },
	{ "id": "1005", "name": "Huamal\u00edes", "department_id": "10" },
	{ "id": "1006", "name": "Leoncio Prado", "department_id": "10" },
	{ "id": "1007", "name": "Mara\u00f1\u00f3n", "department_id": "10" },
	{ "id": "1008", "name": "Pachitea", "department_id": "10" },
	{ "id": "1009", "name": "Puerto Inca", "department_id": "10" },
	{ "id": "1010", "name": "Lauricocha ", "department_id": "10" },
	{ "id": "1011", "name": "Yarowilca ", "department_id": "10" },
	{ "id": "1101", "name": "Ica ", "department_id": "11" },
	{ "id": "1102", "name": "Chincha ", "department_id": "11" },
	{ "id": "1103", "name": "Nasca ", "department_id": "11" },
	{ "id": "1104", "name": "Palpa ", "department_id": "11" },
	{ "id": "1105", "name": "Pisco ", "department_id": "11" },
	{ "id": "1201", "name": "Huancayo ", "department_id": "12" },
	{ "id": "1202", "name": "Concepci\u00f3n ", "department_id": "12" },
	{ "id": "1203", "name": "Chanchamayo ", "department_id": "12" },
	{ "id": "1204", "name": "Jauja ", "department_id": "12" },
	{ "id": "1205", "name": "Jun\u00edn ", "department_id": "12" },
	{ "id": "1206", "name": "Satipo ", "department_id": "12" },
	{ "id": "1207", "name": "Tarma ", "department_id": "12" },
	{ "id": "1208", "name": "Yauli ", "department_id": "12" },
	{ "id": "1209", "name": "Chupaca ", "department_id": "12" },
	{ "id": "1301", "name": "Trujillo ", "department_id": "13" },
	{ "id": "1302", "name": "Ascope ", "department_id": "13" },
	{ "id": "1303", "name": "Bol\u00edvar ", "department_id": "13" },
	{ "id": "1304", "name": "Chep\u00e9n ", "department_id": "13" },
	{ "id": "1305", "name": "Julc\u00e1n ", "department_id": "13" },
	{ "id": "1306", "name": "Otuzco ", "department_id": "13" },
	{ "id": "1307", "name": "Pacasmayo ", "department_id": "13" },
	{ "id": "1308", "name": "Pataz ", "department_id": "13" },
	{ "id": "1309", "name": "S\u00e1nchez Carri\u00f3n ", "department_id": "13" },
	{ "id": "1310", "name": "Santiago de Chuco ", "department_id": "13" },
	{ "id": "1311", "name": "Gran Chim\u00fa ", "department_id": "13" },
	{ "id": "1312", "name": "Vir\u00fa ", "department_id": "13" },
	{ "id": "1401", "name": "Chiclayo ", "department_id": "14" },
	{ "id": "1402", "name": "Ferre\u00f1afe ", "department_id": "14" },
	{ "id": "1403", "name": "Lambayeque ", "department_id": "14" },
	{ "id": "1501", "name": "Lima ", "department_id": "15" },
	{ "id": "1502", "name": "Barranca ", "department_id": "15" },
	{ "id": "1503", "name": "Cajatambo ", "department_id": "15" },
	{ "id": "1504", "name": "Canta ", "department_id": "15" },
	{ "id": "1505", "name": "Ca\u00f1ete ", "department_id": "15" },
	{ "id": "1506", "name": "Huaral ", "department_id": "15" },
	{ "id": "1507", "name": "Huarochir\u00ed ", "department_id": "15" },
	{ "id": "1508", "name": "Huaura ", "department_id": "15" },
	{ "id": "1509", "name": "Oy\u00f3n ", "department_id": "15" },
	{ "id": "1510", "name": "Yauyos ", "department_id": "15" },
	{ "id": "1601", "name": "Maynas ", "department_id": "16" },
	{ "id": "1602", "name": "Alto Amazonas ", "department_id": "16" },
	{ "id": "1603", "name": "Loreto ", "department_id": "16" },
	{
		"id": "1604",
		"name": "Mariscal Ram\u00f3n Castilla ",
		"department_id": "16"
	},
	{ "id": "1605", "name": "Requena ", "department_id": "16" },
	{ "id": "1606", "name": "Ucayali ", "department_id": "16" },
	{
		"id": "1607",
		"name": "Datem del Mara\u00f1\u00f3n ",
		"department_id": "16"
	},
	{ "id": "1608", "name": "Putumayo", "department_id": "16" },
	{ "id": "1701", "name": "Tambopata ", "department_id": "17" },
	{ "id": "1702", "name": "Manu ", "department_id": "17" },
	{ "id": "1703", "name": "Tahuamanu ", "department_id": "17" },
	{ "id": "1801", "name": "Mariscal Nieto ", "department_id": "18" },
	{
		"id": "1802",
		"name": "General S\u00e1nchez Cerro ",
		"department_id": "18"
	},
	{ "id": "1803", "name": "Ilo ", "department_id": "18" },
	{ "id": "1901", "name": "Pasco ", "department_id": "19" },
	{
		"id": "1902",
		"name": "Daniel Alcides Carri\u00f3n ",
		"department_id": "19"
	},
	{ "id": "1903", "name": "Oxapampa ", "department_id": "19" },
	{ "id": "2001", "name": "Piura ", "department_id": "20" },
	{ "id": "2002", "name": "Ayabaca ", "department_id": "20" },
	{ "id": "2003", "name": "Huancabamba ", "department_id": "20" },
	{ "id": "2004", "name": "Morrop\u00f3n ", "department_id": "20" },
	{ "id": "2005", "name": "Paita ", "department_id": "20" },
	{ "id": "2006", "name": "Sullana ", "department_id": "20" },
	{ "id": "2007", "name": "Talara ", "department_id": "20" },
	{ "id": "2008", "name": "Sechura ", "department_id": "20" },
	{ "id": "2101", "name": "Puno ", "department_id": "21" },
	{ "id": "2102", "name": "Az\u00e1ngaro ", "department_id": "21" },
	{ "id": "2103", "name": "Carabaya ", "department_id": "21" },
	{ "id": "2104", "name": "Chucuito ", "department_id": "21" },
	{ "id": "2105", "name": "El Collao ", "department_id": "21" },
	{ "id": "2106", "name": "Huancan\u00e9 ", "department_id": "21" },
	{ "id": "2107", "name": "Lampa ", "department_id": "21" },
	{ "id": "2108", "name": "Melgar ", "department_id": "21" },
	{ "id": "2109", "name": "Moho ", "department_id": "21" },
	{ "id": "2110", "name": "San Antonio de Putina ", "department_id": "21" },
	{ "id": "2111", "name": "San Rom\u00e1n ", "department_id": "21" },
	{ "id": "2112", "name": "Sandia ", "department_id": "21" },
	{ "id": "2113", "name": "Yunguyo ", "department_id": "21" },
	{ "id": "2201", "name": "Moyobamba ", "department_id": "22" },
	{ "id": "2202", "name": "Bellavista ", "department_id": "22" },
	{ "id": "2203", "name": "El Dorado ", "department_id": "22" },
	{ "id": "2204", "name": "Huallaga ", "department_id": "22" },
	{ "id": "2205", "name": "Lamas ", "department_id": "22" },
	{ "id": "2206", "name": "Mariscal C\u00e1ceres ", "department_id": "22" },
	{ "id": "2207", "name": "Picota ", "department_id": "22" },
	{ "id": "2208", "name": "Rioja ", "department_id": "22" },
	{ "id": "2209", "name": "San Mart\u00edn ", "department_id": "22" },
	{ "id": "2210", "name": "Tocache ", "department_id": "22" },
	{ "id": "2301", "name": "Tacna ", "department_id": "23" },
	{ "id": "2302", "name": "Candarave ", "department_id": "23" },
	{ "id": "2303", "name": "Jorge Basadre ", "department_id": "23" },
	{ "id": "2304", "name": "Tarata ", "department_id": "23" },
	{ "id": "2401", "name": "Tumbes ", "department_id": "24" },
	{ "id": "2402", "name": "Contralmirante Villar ", "department_id": "24" },
	{ "id": "2403", "name": "Zarumilla ", "department_id": "24" },
	{ "id": "2501", "name": "Coronel Portillo ", "department_id": "25" },
	{ "id": "2502", "name": "Atalaya ", "department_id": "25" },
	{ "id": "2503", "name": "Padre Abad ", "department_id": "25" },
	{ "id": "2504", "name": "Pur\u00fas", "department_id": "25" }
];
