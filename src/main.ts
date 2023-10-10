import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';
/*import 'core-js/es/reflect'; // Asegúrate de tener esta importación
import 'zone.js/dist/zone'; // Asegúrate de tener esta importación

import 'stream'; // Agrega esta importación para el módulo 'stream'*/

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch((err: any) => console.error(err));
