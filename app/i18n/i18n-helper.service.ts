import { Injectable } from '@angular/core';
import { TranslateService } from 'ng2-translate';

@Injectable()
export class I18nHelperService{

  constructor(
    private translate: TranslateService
  ){};

  public detectUserLanguage(){
    let supportedLanguages: string[] = [
      'de',
      'en',
      'ru'
    ];
    //- split the IETF language tag given by the user agent
    //- we only need the first part (e.g. 'en' from 'en-US')
    //  which is probably a ISO-639-1 tag
    //- so we can keep it simple
    let browserLang: string = navigator.language.split('-')[0];

    //make sure to add the language codes of all supported languages
    let lang = supportedLanguages.indexOf(browserLang) === -1 ? 'en': browserLang;

     //the language to use
    this.translate.use(lang);

    //this language will be used as a fallback if a translation wasn't found in the current language
    this.translate.setDefaultLang('en');
  }

}
