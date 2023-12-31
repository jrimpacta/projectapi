import {Pipe, PipeTransform} from '@angular/core';
import {ControlItem} from "src/app/models/frontend";
import {Departamentos} from "src/app/models/backend/ubigeo";

@Pipe({
  name: 'departamento'
})
export class DepartamentoPipe implements PipeTransform {

  transform(value: any): ControlItem {
	  return {
		  value: value.id_ubigeo,
		  label: value.nombre_ubigeo
	  };
  }

}
