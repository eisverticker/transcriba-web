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
var image_viewer_component_1 = require("./image-viewer.component");
// modules
var platform_browser_1 = require("@angular/platform-browser");
var forms_1 = require("@angular/forms");
var auth_module_1 = require("../loopback-auth/auth.module");
var leaflet_module_1 = require("../leaflet/leaflet.module");
// services
var image_viewer_service_1 = require("./image-viewer.service");
var ImageViewerModule = (function () {
    function ImageViewerModule() {
    }
    return ImageViewerModule;
}());
ImageViewerModule = __decorate([
    core_1.NgModule({
        declarations: [
            image_viewer_component_1.ImageViewerComponent
        ],
        imports: [
            platform_browser_1.BrowserModule,
            forms_1.FormsModule,
            auth_module_1.AuthModule,
            leaflet_module_1.LeafletModule
        ],
        exports: [image_viewer_component_1.ImageViewerComponent],
        bootstrap: [],
        providers: [
            image_viewer_service_1.ImageViewerService
        ]
    })
], ImageViewerModule);
exports.ImageViewerModule = ImageViewerModule;
//# sourceMappingURL=image-viewer.module.js.map