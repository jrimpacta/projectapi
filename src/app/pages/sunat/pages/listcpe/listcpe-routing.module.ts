import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ListcpeComponent} from "./listcpe.component";
import {GreremitenteComponent} from "../greremitente/greremitente.component";
import {GretranspComponent} from "../gretransp/gretransp.component";

const routes: Routes = [
	{
		path: "",
		component: ListcpeComponent
	}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ListcpeRoutingModule { }
