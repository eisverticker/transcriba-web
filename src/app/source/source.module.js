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
var source_component_1 = require("./source.component");
var source_details_component_1 = require("./source-details.component");
// modules
var platform_browser_1 = require("@angular/platform-browser");
var forms_1 = require("@angular/forms");
var router_1 = require("@angular/router");
var i18n_module_1 = require("../i18n/i18n.module");
var utility_module_1 = require("../utilities/utility.module");
var auth_module_1 = require("../loopback-auth/auth.module");
var gadget_module_1 = require("../gadgets/gadget.module");
var http_1 = require("@angular/http");
// services
var source_service_1 = require("./source.service");
// routing
var source_routing_1 = require("./source.routing");
var SourceModule = (function () {
    function SourceModule() {
    }
    return SourceModule;
}());
SourceModule = __decorate([
    core_1.NgModule({
        declarations: [
            source_component_1.SourceComponent,
            source_details_component_1.SourceDetailsComponent
        ],
        imports: [
            platform_browser_1.BrowserModule,
            forms_1.FormsModule,
            i18n_module_1.I18nModule,
            http_1.HttpModule,
            utility_module_1.UtilityModule,
            auth_module_1.AuthModule,
            router_1.RouterModule,
            gadget_module_1.GadgetModule,
            source_routing_1.sourceRouting
        ],
        exports: [source_component_1.SourceComponent, source_details_component_1.SourceDetailsComponent],
        bootstrap: [],
        providers: [
            source_service_1.SourceService
        ]
    })
], SourceModule);
exports.SourceModule = SourceModule;
//# sourceMappingURL=source.module.js.map