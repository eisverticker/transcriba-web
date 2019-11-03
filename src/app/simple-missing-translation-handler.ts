import { MissingTranslationHandler, MissingTranslationHandlerParams } from '@ngx-translate/core';

export class SimpleMissingTranslationHandler implements MissingTranslationHandler {
  handle(params: MissingTranslationHandlerParams) {
      return params.key;
  }
}
