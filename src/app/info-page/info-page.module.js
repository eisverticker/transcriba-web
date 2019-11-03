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
var info_page_component_1 = require("./info-page.component");
var info_page_viewer_component_1 = require("./info-page-viewer.component");
var info_page_discussion_component_1 = require("./info-page-discussion.component");
var info_page_edit_component_1 = require("./info-page-edit.component");
var info_page_management_component_1 = require("./info-page-management.component");
// pipes
// modules
var platform_browser_1 = require("@angular/platform-browser");
var forms_1 = require("@angular/forms");
var router_1 = require("@angular/router");
var i18n_module_1 = require("../i18n/i18n.module");
var utility_module_1 = require("../utilities/utility.module");
var auth_module_1 = require("../loopback-auth/auth.module");
var gadget_module_1 = require("../gadgets/gadget.module");
var http_1 = require("@angular/http");
var discussion_module_1 = require("../discussion/discussion.module");
// services
var info_page_service_1 = require("./info-page.service");
// routing
var info_page_routing_1 = require("./info-page.routing");
var InfoPageModule = (function () {
    function InfoPageModule() {
    }
    return InfoPageModule;
}());
InfoPageModule = __decorate([
    core_1.NgModule({
        declarations: [
            info_page_component_1.InfoPageComponent,
            info_page_viewer_component_1.InfoPageViewerComponent,
            info_page_edit_component_1.InfoPageEditComponent,
            info_page_management_component_1.InfoPageManagementComponent,
            info_page_discussion_component_1.InfoPageDiscussionComponent
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
            discussion_module_1.DiscussionModule,
            info_page_routing_1.infoPageRouting
        ],
        exports: [
            info_page_component_1.InfoPageComponent,
            info_page_edit_component_1.InfoPageEditComponent,
            info_page_management_component_1.InfoPageManagementComponent,
            info_page_viewer_component_1.InfoPageViewerComponent,
            info_page_discussion_component_1.InfoPageDiscussionComponent
        ],
        bootstrap: [],
        providers: [
            info_page_service_1.InfoPageService
        ]
    })
], InfoPageModule);
exports.InfoPageModule = InfoPageModule;
//# sourceMappingURL=info-page.module.js.map