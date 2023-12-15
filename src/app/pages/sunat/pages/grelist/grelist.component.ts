import {AfterViewInit, Component, EventEmitter, inject, OnInit, Output, signal, ViewChild} from '@angular/core';
import {ContribuyenteService, DateService, SunatService} from "src/app/services";
import {GreList} from "src/app/models/backend/cpe/gre/grelist";
import {MatPaginator} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";
import {MatSort} from "@angular/material/sort";
import {MatDialog} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {ConfirmationDialogComponent} from "src/app/shared/popups/confirmation-dialog/confirmation-dialog.component";

@Component({
    selector: 'app-grelist',
    templateUrl: './grelist.component.html',
    styleUrls: ['./grelist.component.scss']
})
export class GrelistComponent implements OnInit, AfterViewInit  {

    displayedColumns: string[] = ['fechaEmision', 'fechaTraslado', 'destinatario', 'transportista', 'unidadMedida', 'pesoTotal', 'motivo', 'acciones' ];

    private contribuyenteServices = inject(ContribuyenteService);
	dateServices = inject(DateService);
	private _snackBar = inject(MatSnackBar);
	data! : GreList[];

	@Output() idCpe!:number;
	@Output() idCpeEmitter: EventEmitter<number> = new EventEmitter<number>();

	@ViewChild(MatPaginator) paginator!: MatPaginator;
	@ViewChild(MatSort) sort!: MatSort;

	private sunatService = inject(SunatService);

    ngOnInit(): void {
		this.getData();
	}
	ngAfterViewInit() {
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
	dataSource = new MatTableDataSource<GreList>(this.data);

	getCpe = (id: number) => {
	}

	deleteCpe = async (id: number) => {
		console.log("id para eliminar " + id);
		await this.sunatService.getEliminarCpe(id.toString())
			.then((result) => {
				console.log(result);
				this.openSnackBarSuccess();
				this.getData();
			})
			.catch((error) => {
				console.error('Error al eliminar la guía', error);
				this.openSnackBarError();
			});
	}

	/*deleteCpe = async (id: number) => {
		const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
			data: { message: '¿Estás seguro de que deseas eliminar este registro?' },
		});

		dialogRef.afterClosed().subscribe(async (result) => {
			if (result) {
				console.log("id para eliminar " + id);
				try {
					await this.sunatService.getEliminarCpe(id.toString());
					console.log("Eliminación exitosa");
					this.openSnackBarSuccess();
					this.getData();
				} catch (error) {
					console.error('Error al eliminar la guía', error);
					this.openSnackBarError();
				}
			}
		});
	};*/


	getData = () => {
		this.contribuyenteServices.getAllCont().subscribe(data => {
			this.dataSource.data = data;
		});
	}

	constructor(private dialog: MatDialog) {
	}

	openSnackBarSuccess = () => {
		return this._snackBar.open(`La guía de remisión ha sido eliminada.`, 'Cerrar', {
			duration: 2500,
			verticalPosition: 'top',
			horizontalPosition: 'end',
			panelClass: ['success'],
		});
	}

	openSnackBarError() {
		return this._snackBar.open('❌ Ocurrió un error al tratar de eliminar la GRE', 'Cerrar', {
			duration: 2500,
			verticalPosition: 'top',
			horizontalPosition: 'end',
			panelClass: ['error'],
		});
	}
}
