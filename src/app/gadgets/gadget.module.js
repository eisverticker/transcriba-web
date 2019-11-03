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
var delete_button_component_1 = require("./delete-button.component");
var inline_spinner_component_1 = require("./inline-spinner.component");
var pagination_bar_component_1 = require("./pagination-bar.component");
var sub_navbar_component_1 = require("./sub-navbar.component");
var fail_notifier_component_1 = require("./fail-notifier.component");
var growing_textarea_component_1 = require("./growing-textarea.component");
// directives
// modules
var platform_browser_1 = require("@angular/platform-browser");
var forms_1 = require("@angular/forms");
var router_1 = require("@angular/router");
var i18n_module_1 = require("../i18n/i18n.module");
var GadgetModule = (function () {
    function GadgetModule() {
    }
    return GadgetModule;
}());
GadgetModule = __decorate([
    core_1.NgModule({
        declarations: [
            fail_notifier_component_1.FailNotifierComponent,
            delete_button_component_1.DeleteButtonComponent,
            inline_spinner_component_1.InlineSpinnerComponent,
            pagination_bar_component_1.PaginationBarComponent,
            sub_navbar_component_1.SubNavbarComponent,
            growing_textarea_component_1.GrowingTextareaComponent
        ],
        imports: [platform_browser_1.BrowserModule, forms_1.FormsModule, i18n_module_1.I18nModule, router_1.RouterModule],
        exports: [
            fail_notifier_component_1.FailNotifierComponent,
            delete_button_component_1.DeleteButtonComponent,
            inline_spinner_component_1.InlineSpinnerComponent,
            pagination_bar_component_1.PaginationBarComponent,
            sub_navbar_component_1.SubNavbarComponent,
            growing_textarea_component_1.GrowingTextareaComponent
        ],
        bootstrap: [],
        providers: []
    })
], GadgetModule);
exports.GadgetModule = GadgetModule;
//# sourceMappingURL=gadget.module.js.map