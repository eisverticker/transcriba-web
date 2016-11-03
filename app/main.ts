import {enableProdMode} from '@angular/core';
enableProdMode();

//just-in-time option (development)
//import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
//import { AppModule } from './app.module';
//const platform = platformBrowserDynamic();
//platform.bootstrapModule(AppModule);
//ahead-of-time option (production)
import { platformBrowser }    from '@angular/platform-browser';
import { AppModuleNgFactory } from '../aot/app/app.module.ngfactory';
platformBrowser().bootstrapModuleFactory(AppModuleNgFactory);
