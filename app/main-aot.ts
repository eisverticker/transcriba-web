import { platformBrowser }    from '@angular/platform-browser';
import { AppModuleNgFactory } from '../aot/app/app.module.ngfactory';//leave the dots like they are
platformBrowser().bootstrapModuleFactory(AppModuleNgFactory);
