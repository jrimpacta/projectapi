import {AfterViewInit, Component, inject, OnInit, Output, signal, ViewChild} from '@angular/core';
import {ContribuyenteService, DateService} from "src/app/services";
import {GreList} from "src/app/models/backend/cpe/gre/grelist";
import {MatPaginator} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";
import {MatSort} from "@angular/material/sort";

@Component({
    selector: 'app-grelist',
    templateUrl: './grelist.component.html',
    styleUrls: ['./grelist.component.scss']
})
export class GrelistComponent implements OnInit, AfterViewInit  {

    displayedColumns: string[] = ['fechaEmision', 'fechaTraslado', 'destinatario', 'transportista', 'unidadMedida', 'pesoTotal', 'motivo', 'acciones' ];

    contribuyenteServices = inject(ContribuyenteService);
	dateServices = inject(DateService);
	data! : GreList[];

	@Output() idCpe!:number;

	@ViewChild(MatPaginator) paginator!: MatPaginator;
	@ViewChild(MatSort) sort!: MatSort;

    ngOnInit(): void {
		this.getData();
	}
	ngAfterViewInit() {
		//let response = await this.contribuyenteServices.all();
		console.log("ng table");
		//this.dataSource = new MatTableDataSource<GreList>(response);
		this.getData();
		this.dataSource.paginator = this.paginator;
		this.paginator._intl.itemsPerPageLabel = 'Ítems por página';
		console.log(this.paginator);

		this.dataSource.sort = this.sort;
	}

	applyFilter(event: Event) {
		const filterValue = (event.target as HTMLInputElement).value;
		this.dataSource.filter = filterValue.trim().toLowerCase();
	}
	dataSource =
		new MatTableDataSource<GreList>(this.data);

	getCpe = (id: number) => {
		console.log(id);



	}

	getData = () => {
		this.contribuyenteServices.getAllCont().subscribe(data => {
			this.dataSource.data = data;
		});
	}


}
