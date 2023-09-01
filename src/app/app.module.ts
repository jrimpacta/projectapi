import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {provideHttpClient} from '@angular/common/http';

import { NotificationModule } from './services';
import { HeaderComponent } from './components/header/header.component';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';

// BEGIN FIREBASE
import {initializeApp, provideFirebaseApp} from '@angular/fire/app';
import {environment} from '../environments/environment';
import {provideAnalytics, getAnalytics, ScreenTrackingService, UserTrackingService} from '@angular/fire/analytics';
import {provideAuth, getAuth} from '@angular/fire/auth';
import {provideDatabase, getDatabase} from '@angular/fire/database';
import {provideFirestore, getFirestore} from '@angular/fire/firestore';
import {provideMessaging, getMessaging} from '@angular/fire/messaging';
import {provideStorage, getStorage} from '@angular/fire/storage';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
// END FIREBASE

import {MatNativeDateModule, MatDateFormats, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from "@angular/material/core";

const APP_DATE_FORMATS: MatDateFormats = {
	parse: {
		dateInput: {day: 'numeric', month: 'numeric', year: 'numeric'}
	},
	display: {
		dateInput: {day: 'numeric', month: 'short', year: 'numeric'},
		monthYearLabel: {year: 'numeric', month: 'short'},
		dateA11yLabel: {year: 'numeric', month: 'long', day: 'numeric'},
		monthYearA11yLabel: {year: 'numeric', month: 'long'}
	}
}

@NgModule({
	declarations: [
		AppComponent,
		HeaderComponent
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		provideFirebaseApp(() => initializeApp(environment.firebase.config)),
		//provideAnalytics(() => getAnalytics()),
		provideAuth(() => getAuth()),
		provideDatabase(() => getDatabase()),
		provideFirestore(() => getFirestore()),
		provideMessaging(() => getMessaging()),
		provideStorage(() => getStorage()),
		BrowserAnimationsModule,
		MatNativeDateModule,
		NotificationModule.forRoot()
	],
	providers: [
		ScreenTrackingService,
		UserTrackingService,
		provideHttpClient(),
		{
			provide: MAT_DATE_LOCALE,
			//useValue: 'en-GB'
			useValue: 'es-MX'
		}, {
			provide: MAT_DATE_FORMATS,
			useValue: APP_DATE_FORMATS
		}
	],
	bootstrap: [AppComponent]
})
export class AppModule {
}
