"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var ng2_translate_1 = require("ng2-translate");
var i18n_helper_service_1 = require("./i18n-helper.service");
var http_1 = require("@angular/http");
function createTranslateLoader(http) {
    return new ng2_translate_1.TranslateStaticLoader(http, '/web/locales', '.json');
}
exports.createTranslateLoader = createTranslateLoader;
var I18nModule = (function () {
    function I18nModule() {
    }
    return I18nModule;
}());
I18nModule = __decorate([
    core_1.NgModule({
        imports: [
            ng2_translate_1.TranslateModule.forRoot({
                provide: ng2_translate_1.TranslateLoader,
                useFactory: (createTranslateLoader),
                deps: [http_1.Http]
            })
        ],
        declarations: [],
        exports: [
            ng2_translate_1.TranslateModule
        ],
        providers: [
            i18n_helper_service_1.I18nHelperService
        ]
    })
], I18nModule);
exports.I18nModule = I18nModule;
//# sourceMappingURL=i18n.module.js.map