"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var ng2_translate_1 = require("ng2-translate");
var I18nHelperService = (function () {
    function I18nHelperService(translate) {
        this.translate = translate;
    }
    ;
    I18nHelperService.prototype.detectUserLanguage = function () {
        var supportedLanguages = [
            'de',
            'en',
            'ru'
        ];
        // - split the IETF language tag given by the user agent
        // - we only need the first part (e.g. 'en' from 'en-US')
        //  which is probably a ISO-639-1 tag
        // - so we can keep it simple
        var browserLang = navigator.language.split('-')[0];
        // make sure to add the language codes of all supported languages
        var lang = supportedLanguages.indexOf(browserLang) === -1 ? 'en' : browserLang;
        // the language to use
        this.translate.use(lang);
        // this language will be used as a fallback if a translation wasn't found in the current language
        this.translate.setDefaultLang('de');
    };
    return I18nHelperService;
}());
I18nHelperService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [ng2_translate_1.TranslateService])
], I18nHelperService);
exports.I18nHelperService = I18nHelperService;
//# sourceMappingURL=i18n-helper.service.js.map