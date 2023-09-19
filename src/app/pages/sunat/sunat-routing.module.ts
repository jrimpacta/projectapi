import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SunatComponent} from "./sunat.component";

const routes: Routes = [
	{
		path: "",
		component: SunatComponent,
		children: [
			{
				path: "facturacion",
				loadChildren: () => import("./facturacion/facturacion.module")
					.then(m => m.FacturacionModule)
			}, {
				path: "listcpe",
				loadChildren: () => import("./pages/listcpe/listcpe.module")
					.then(m => m.ListcpeModule)
			}, {
				path: "gre",
				loadChildren: () => import("./pages/gre/gre.module")
					.then(m => m.GreModule)
			}, {
				path: "greremitente",
				loadChildren: () => import("./pages/greremitente/greremitente.module")
					.then(m => m.GreremitenteModule)
			}, {
				path: "greremitente",
				loadChildren: () => import("./pages/greremitente/greremitente.module")
					.then(m => m.GreremitenteModule)
			}, {
				path: "remitentelist",
				loadChildren: () => import("./pages/grelist/grelist.module")
					.then(m => m.GrelistModule)
			}
		]
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class SunatRoutingModule {
}
