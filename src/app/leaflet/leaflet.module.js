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
var tile_viewer_component_1 = require("./tile-viewer.component");
// modules
var platform_browser_1 = require("@angular/platform-browser");
var forms_1 = require("@angular/forms");
var gadget_module_1 = require("../gadgets/gadget.module");
// services
// routing
var LeafletModule = (function () {
    function LeafletModule() {
    }
    return LeafletModule;
}());
LeafletModule = __decorate([
    core_1.NgModule({
        declarations: [
            tile_viewer_component_1.TileViewerComponent
        ],
        imports: [
            platform_browser_1.BrowserModule,
            forms_1.FormsModule,
            gadget_module_1.GadgetModule
        ],
        exports: [tile_viewer_component_1.TileViewerComponent],
        bootstrap: [],
        providers: []
    })
], LeafletModule);
exports.LeafletModule = LeafletModule;
//# sourceMappingURL=leaflet.module.js.map