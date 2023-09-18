import {Injectable} from '@angular/core';
import {
	HttpRequest,
	HttpHandler,
	HttpEvent,
	HttpInterceptor
} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

	constructor() {
	}

	/* https://angular.io/guide/understanding-communicating-with-http#setup-installing-the-module
	* In my case interceptor wasn't getting involved for service calls because I had imported
	* HttpClientModule multiple times, for different modules.
	* Later I found that HttpClientModule must be imported only once
	*
	* Esta es la razón por la cual no funciona los interceptors, se pospone buscar donde esta repetido
	*  HttpClient, ya que solo se debe declarar en Module (UNA SOLA VEZ).
	* */
	intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
		let clonedRequest = request;

		clonedRequest = request.clone({
			setHeaders: {
				'content-type': 'application/json'
			}
		});

		return next.handle(clonedRequest);
	}
}
