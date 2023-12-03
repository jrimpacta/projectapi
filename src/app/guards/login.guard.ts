import {inject} from "@angular/core";
import {Router} from "@angular/router";

export const loginGuard = () => {
    const router = inject(Router);

    // TODO combrobar token, ahora solo esta comparando el username
    if (localStorage.getItem('userEmail')) {
        return true;
    } else {
        router.navigate(['/profile/signinall']);
        return false
    }
}
