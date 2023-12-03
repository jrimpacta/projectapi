import {Component, OnInit} from '@angular/core';
import {MatButtonModule} from "@angular/material/button";
import {MatCardModule} from "@angular/material/card";

@Component({
	selector: 'app-listcpe',
	templateUrl: './listcpe.component.html',
	styleUrls: ['./listcpe.component.scss']
})
export class ListcpeComponent implements OnInit{
	isReload:boolean = false;
	constructor() {
		//this.reloadPage();
	}

	reloadPage = () => {
		if (this.isReload == false) {
			location.reload();
			this.isReload = true;
		}
	}

	ngOnInit(): void {
		//this.reloadPage();
	}
}
