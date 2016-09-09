import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app.module';
const platform = platformBrowserDynamic();
platform.bootstrapModule(AppModule);

//import { platformBrowser } from '@angular/platform-browser';
//import { MyAppModuleNgFactory } from './app.ngfactory'; //generated code
//platformBrowser().bootstrapModuleFactory( MyAppModuleNgFactory );
