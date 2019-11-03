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
var be_patient_component_1 = require("./be-patient.component");
// directives
var email_validator_directive_1 = require("./email-validator.directive");
// pipes
var replace_if_empty_pipe_1 = require("./replace-if-empty.pipe");
// services
var backend_helper_1 = require("./backend-helper");
var logger_service_1 = require("./logger.service");
var notification_service_1 = require("./notification.service");
var app_service_1 = require("./app.service");
// modules
var forms_1 = require("@angular/forms");
var platform_browser_1 = require("@angular/platform-browser");
var configuration_module_1 = require("../config/configuration.module");
var i18n_module_1 = require("../i18n/i18n.module");
var UtilityModule = (function () {
    function UtilityModule() {
    }
    return UtilityModule;
}());
UtilityModule = __decorate([
    core_1.NgModule({
        declarations: [be_patient_component_1.BePatientComponent, email_validator_directive_1.EmailValidatorDirective, replace_if_empty_pipe_1.ReplaceIfEmptyPipe],
        exports: [be_patient_component_1.BePatientComponent, email_validator_directive_1.EmailValidatorDirective, replace_if_empty_pipe_1.ReplaceIfEmptyPipe],
        imports: [platform_browser_1.BrowserModule, forms_1.FormsModule, configuration_module_1.ConfigurationModule, i18n_module_1.I18nModule],
        bootstrap: [],
        providers: [backend_helper_1.BackendHelper, logger_service_1.LoggerService, notification_service_1.NotificationService, app_service_1.AppService]
    })
], UtilityModule);
exports.UtilityModule = UtilityModule;
//# sourceMappingURL=utility.module.js.map