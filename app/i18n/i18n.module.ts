import { NgModule } from '@angular/core';
import {
  TranslateModule,
  TranslateLoader,
  TranslateStaticLoader
} from 'ng2-translate';
import { I18nHelperService } from './i18n-helper.service';

import { Http } from '@angular/http';

export function createTranslateLoader(http: Http) {
    return new TranslateStaticLoader(http, '/web/locales', '.json');
}

@NgModule({
  imports:      [
    TranslateModule.forRoot({
      provide: TranslateLoader,
      useFactory: (createTranslateLoader),
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
