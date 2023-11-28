import {Component, inject, OnInit} from '@angular/core';
import Swal from 'sweetalert2'
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-gre',
  templateUrl: './gre.component.html',
  styleUrls: ['./gre.component.scss']
})
export class GreComponent implements OnInit {

	serieCorrelativo!:String;
	id!:number | null | undefined;
	activatedRoute = inject(ActivatedRoute);
	constructor(private router: Router) {
		this.serieCorrelativo = "T001-00000001";
	}

	ngOnInit() {
		this.activatedRoute.params.subscribe(params => {

		});
	}
	ShowAlert = () => {
		Swal.fire({
			title: `Tu Guía de Remisión ${this.serieCorrelativo} se genero con éxito.`,
			timer: 12000,
			timerProgressBar: true,
			icon: "success",
			showCancelButton: false,
			showConfirmButton: false,
			showCloseButton: false,
			showLoaderOnConfirm: true,
			//width: '50%',
			html: `
				<link rel="stylesheet" href="../../../../../assets/bootstrap-icons/font/bootstrap-icons.css">
				<div class="d-flex justify-content-between">
				  <button id="btnImprimir" class="btn btn-outline-primary btn-sm">
					<i class="bi bi-printer"></i> Imprimir
				  </button>
				  <button id="btnCompartir" class="btn btn-outline-success btn-sm">
					<i class="bi bi-share"></i> Compartir
				  </button>
				  <button id="btnDescargar" class="btn btn-outline-danger btn-sm">
					<i class="bi bi-file-earmark-arrow-down"></i> Descargar
				  </button>
				  <button id="btnEmitirOtro" class="btn btn-outline-primary btn-sm">
					<i class="bi bi-box-arrow-up"></i> Emitir otro
				  </button>
				</div>
			  `,
			didOpen: () => {
			},
			willClose: () => {
			}
		}).then((result) => {

		});
		const btnImprimir = document.getElementById('btnImprimir');
		if (btnImprimir) {
			btnImprimir.addEventListener('click', () => this.imprimir());
		}

		const btnCompartir = document.getElementById('btnCompartir');
		if (btnCompartir) {
			btnCompartir.addEventListener('click', () => this.compartir());
		}

		const btnDescargar = document.getElementById('btnDescargar');
		if (btnDescargar) {
			btnDescargar.addEventListener('click', () => this.descargar());
		}

		const btnEmitirOtro = document.getElementById('btnEmitirOtro');
		if (btnEmitirOtro) {
			btnEmitirOtro.addEventListener('click', () => this.emitirOtro());
		}
	}

	imprimir() {
		console.log('Descargando PDF...');
	}

	compartir() {
		console.log('Compartiendo...');
	}

	descargar() {
		console.log('Descargando XML...');
	}

	emitirOtro = () => {
		Swal.close();
		this.router.navigate(['/sunat/greremitente']);
	}
}
