import { MissingTranslationHandler } from 'ng2-translate/ng2-translate';

export class SimpleMissingTranslationHandler implements MissingTranslationHandler {
  handle(key: string) {
      return key;
  }
}
