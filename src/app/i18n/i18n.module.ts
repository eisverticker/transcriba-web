import { NgModule } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import {
  TranslateModule,
  TranslateLoader,
  MissingTranslationHandler,
  TranslateStore
} from '@ngx-translate/core';

// WORKAROUND (see #21)
import { I18nHelperService } from './i18n-helper.service';
import { SimpleMissingTranslationHandler } from './simple-missing-translation-handler';

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(http, './assets/locales/', '.json');
}

@NgModule({
  imports: [
    HttpClientModule,
    TranslateModule.forChild({
        loader: {
            provide: TranslateLoader,
            useFactory: (HttpLoaderFactory),
            deps: [HttpClient]
        },
        missingTranslationHandler: {provide: MissingTranslationHandler, useClass: SimpleMissingTranslationHandler},
        isolate: true
    })
  ],
  declarations: [],
  providers: [
    I18nHelperService,
    TranslateStore
  ],
  exports: [
    TranslateModule
  ]
})
export class I18nModule { }
