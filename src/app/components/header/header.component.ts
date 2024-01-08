import {Component, inject} from '@angular/core';
import {Router, RouterLink} from "@angular/router";
import {AuthService} from "src/app/services";

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
    router = inject(Router);
	src?: string;
	isLogged : boolean = false;
	private authService = inject(AuthService);
	displayName! : string | null;

	constructor() {
		this.profileView();
		//this.authService.reloadOnce();
	}

	profileView = () => {
		const storedImageProfile = localStorage.getItem('photoURL');
		const storedNameProfile = localStorage.getItem('displayName');

		if (storedImageProfile && storedImageProfile !== '') {
			this.src = storedImageProfile;
		} else {
			this.src = "assets/blank-profile.png";
		}

		if (storedNameProfile && storedNameProfile !== '') {
			this.isLogged = true;
			this.displayName = storedNameProfile;
		} else {
			this.isLogged = false;
		}
	}

    logout = async () => {
        await this.router.navigate(["/profile/signin"]); // En caso de usuarios comunes
        localStorage.clear();
		//this.authService.logOut();
		this.profileView();
    }
}
