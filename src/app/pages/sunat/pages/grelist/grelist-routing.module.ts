import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {GrelistComponent} from "./grelist.component";

const routes: Routes = [
  {
    path: "",
    component: GrelistComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GrelistRoutingModule { }
