import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';


// Inicializa la aplicación Firebase aquí
platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
