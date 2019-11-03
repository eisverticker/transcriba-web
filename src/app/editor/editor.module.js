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
var editor_component_1 = require("./editor.component");
var root_component_1 = require("./root.component");
var tei_element_component_1 = require("./tei-element.component");
var tei_container_component_1 = require("./tei-container.component");
// pipes
// modules
var platform_browser_1 = require("@angular/platform-browser");
var forms_1 = require("@angular/forms");
var i18n_module_1 = require("../i18n/i18n.module");
var utility_module_1 = require("../utilities/utility.module");
var gadget_module_1 = require("../gadgets/gadget.module");
var image_viewer_module_1 = require("../image-viewer/image-viewer.module");
// services
var editor_service_1 = require("./editor.service");
// routing
var EditorModule = (function () {
    function EditorModule() {
    }
    return EditorModule;
}());
EditorModule = __decorate([
    core_1.NgModule({
        declarations: [
            editor_component_1.EditorComponent,
            root_component_1.RootComponent,
            tei_element_component_1.TeiElementComponent,
            tei_container_component_1.TeiContainerComponent
        ],
        imports: [
            platform_browser_1.BrowserModule,
            forms_1.FormsModule,
            i18n_module_1.I18nModule,
            utility_module_1.UtilityModule,
            gadget_module_1.GadgetModule,
            image_viewer_module_1.ImageViewerModule
        ],
        exports: [editor_component_1.EditorComponent],
        bootstrap: [],
        providers: [
            editor_service_1.EditorService
        ]
    })
], EditorModule);
exports.EditorModule = EditorModule;
//# sourceMappingURL=editor.module.js.map