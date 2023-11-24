import { Component } from '@angular/core';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-gre',
  templateUrl: './gre.component.html',
  styleUrls: ['./gre.component.scss']
})
export class GreComponent {
	ShowAlert = () => {
		Swal.fire({
			title: "Tu Guía de Remisión T001-00000001 se genero con éxito.",
			//html: "<p>Podras encontrar todos tus documentos en la sección de documentos</p>",
			timer: 8000,
			timerProgressBar: true,
			icon: "success",
			showCancelButton: false,
			showConfirmButton: false,
			showCloseButton: false,
			showLoaderOnConfirm: true,
			html: `

				<button id="btnImprimir" class="btn btn-warning btn-sm text-white">
				<i class="fa fa-home"></i>Imprimirsssssss</button>
				<button id="btnCompartir" class="btn btn-primary btn-sm text-white">Compartir</button>
				<button id="btnDescargarXML" class="btn btn-primary btn-sm text-white">Descargar XML</button>
				<button id="btnEmitirOtro" class="btn btn-warning btn-sm text-white">Emitir otro</button>
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

		const btnDescargarXML = document.getElementById('btnDescargarXML');
		if (btnDescargarXML) {
			btnDescargarXML.addEventListener('click', () => this.descargarXML());
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

	descargarXML() {
		console.log('Descargando XML...');
	}

	emitirOtro = () => {
		console.log('Emitir otro...');
	}
}
