import { NgModule } from '@angular/core';
import {
  TranslateModule,
  TranslateService,
  TranslateLoader,
  TranslateStaticLoader
} from 'ng2-translate';
import { I18nHelperService } from './i18n-helper.service';

import { Http } from '@angular/http';


@NgModule({
  imports:      [
    TranslateModule.forRoot({
      provide: TranslateLoader,
      useFactory: (http: Http) => new TranslateStaticLoader(http, '/web/locales', '.json'),
      deps: [Http]
    })
  ],
  declarations: [],
  exports:      [
    TranslateModule
  ],
  providers: [
    I18nHelperService
  ]
})
export class I18nModule {

}
