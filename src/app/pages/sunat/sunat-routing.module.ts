import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SunatComponent} from "./sunat.component";
import {loginGuard} from "../../guards/login.guard";

const routes: Routes = [
	{
		path: "",
		component: SunatComponent,
		children: [
			{
				path: "facturacion", // No debe tener guards porque aquí se visualiza la RI
				loadChildren: () => import("./facturacion/facturacion.module")
					.then(m => m.FacturacionModule)
			}, {
				path: "listcpe",
				loadChildren: () => import("./pages/listcpe/listcpe.module")
					.then(m => m.ListcpeModule),
				canActivate: [loginGuard]
			}, {
				path: "gre",
				loadChildren: () => import("./pages/gre/gre.module")
					.then(m => m.GreModule),
				canActivate: [loginGuard]
			}, {
				path: "greremitente",
				loadChildren: () => import("./pages/greremitente/greremitente.module")
					.then(m => m.GreremitenteModule),
				canActivate: [loginGuard]
			}, {
				path: "remitentelist",
				loadChildren: () => import("./pages/grelist/grelist.module")
					.then(m => m.GrelistModule),
				canActivate: [loginGuard]
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
