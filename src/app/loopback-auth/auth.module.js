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
var auth_component_1 = require("./auth.component");
var login_form_component_1 = require("./login-form.component");
var logout_component_1 = require("./logout.component");
var registration_form_component_1 = require("./registration-form.component");
var reset_form_component_1 = require("./reset-form.component");
var verify_component_1 = require("./verify.component");
var admin_component_1 = require("./admin.component");
var user_management_component_1 = require("./user-management.component");
// modules
var platform_browser_1 = require("@angular/platform-browser");
var forms_1 = require("@angular/forms");
var router_1 = require("@angular/router");
var utility_module_1 = require("../utilities/utility.module");
var i18n_module_1 = require("../i18n/i18n.module");
var gadget_module_1 = require("../gadgets/gadget.module");
var http_1 = require("@angular/http");
// services
var auth_service_1 = require("./auth.service");
var user_service_1 = require("./user.service");
var auth_guard_service_1 = require("./auth-guard.service");
var admin_guard_service_1 = require("./admin-guard.service");
var employee_guard_service_1 = require("./employee-guard.service");
var trusted_guard_service_1 = require("./trusted-guard.service");
// routing
var auth_routing_1 = require("./auth.routing");
var AuthModule = (function () {
    function AuthModule() {
    }
    return AuthModule;
}());
AuthModule = __decorate([
    core_1.NgModule({
        declarations: [
            auth_component_1.AuthComponent,
            login_form_component_1.LoginFormComponent,
            logout_component_1.LogoutComponent,
            registration_form_component_1.RegistrationFormComponent,
            reset_form_component_1.ResetFormComponent,
            verify_component_1.VerifyComponent,
            admin_component_1.AdminComponent,
            user_management_component_1.UserManagementComponent
        ],
        imports: [
            platform_browser_1.BrowserModule,
            forms_1.FormsModule,
            utility_module_1.UtilityModule,
            router_1.RouterModule,
            i18n_module_1.I18nModule,
            http_1.HttpModule,
            gadget_module_1.GadgetModule,
            auth_routing_1.authRouting
        ],
        bootstrap: [],
        providers: [
            auth_service_1.AuthService,
            user_service_1.UserService,
            auth_guard_service_1.AuthGuardService,
            trusted_guard_service_1.TrustedGuardService,
            employee_guard_service_1.EmployeeGuardService,
            admin_guard_service_1.AdminGuardService
        ]
    })
], AuthModule);
exports.AuthModule = AuthModule;
//# sourceMappingURL=auth.module.js.map