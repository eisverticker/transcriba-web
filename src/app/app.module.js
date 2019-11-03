"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
// components
var app_component_1 = require("./app.component");
var dashboard_component_1 = require("./dashboard.component");
var page_not_found_component_1 = require("./page-not-found.component");
var authorization_required_component_1 = require("./authorization-required.component");
var app_routing_1 = require("./app.routing");
// modules
var platform_browser_1 = require("@angular/platform-browser");
var http_1 = require("@angular/http");
var utility_module_1 = require("./utilities/utility.module");
var auth_module_1 = require("./loopback-auth/auth.module");
var i18n_module_1 = require("./i18n/i18n.module");
var source_module_1 = require("./source/source.module");
var info_page_module_1 = require("./info-page/info-page.module");
var transcriba_module_1 = require("./transcriba/transcriba.module");
var editor_module_1 = require("./editor/editor.module");
var ng2_toasty_1 = require("ng2-toasty");
var score_module_1 = require("./score/score.module");
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    core_1.NgModule({
        imports: [
            platform_browser_1.BrowserModule,
            app_routing_1.routing,
            http_1.HttpModule,
            utility_module_1.UtilityModule,
            auth_module_1.AuthModule,
            i18n_module_1.I18nModule,
            source_module_1.SourceModule,
            info_page_module_1.InfoPageModule,
            transcriba_module_1.TranscribaModule,
            editor_module_1.EditorModule,
            ng2_toasty_1.ToastyModule.forRoot(),
            score_module_1.ScoreModule
        ],
        declarations: [
            app_component_1.AppComponent,
            dashboard_component_1.DashboardComponent,
            page_not_found_component_1.PageNotFoundComponent,
            authorization_required_component_1.AuthorizationRequiredComponent
        ],
        bootstrap: [app_component_1.AppComponent],
        providers: []
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map