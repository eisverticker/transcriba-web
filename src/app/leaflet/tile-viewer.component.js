"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var L = require("leaflet");
var TileViewerComponent = (function () {
    function TileViewerComponent() {
    }
    TileViewerComponent.prototype.onResize = function ($event) {
        this.fitViewPort();
    };
    TileViewerComponent.prototype.ngAfterViewInit = function () {
        this.fitViewPort();
        this.showViewer();
    };
    TileViewerComponent.prototype.fitViewPort = function () {
        var rect = this.container.nativeElement.getBoundingClientRect();
        var viewPortHeight = window.innerHeight;
        this.container.nativeElement.style.height = (viewPortHeight - rect.top - 35) + 'px';
    };
    TileViewerComponent.prototype.showViewer = function () {
        var viewer = L.map('tileViewer', {
            crs: L.CRS.Simple,
            attributionControl: false
        });
        var A = viewer.unproject([0, 0], 0);
        var C = viewer.unproject([256, 256], 0);
        viewer.fitBounds(L.latLngBounds(A, C), {});
        var tileLayerOptions = {
            minZoom: 0,
            maxZoom: this.maxZoomLevel + 1,
            maxNativeZoom: this.maxZoomLevel,
            bounds: L.latLngBounds(A, C)
        };
        L.tileLayer(this.url, tileLayerOptions)
            .addTo(viewer);
    };
    return TileViewerComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], TileViewerComponent.prototype, "url", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Number)
], TileViewerComponent.prototype, "maxZoomLevel", void 0);
__decorate([
    core_1.ViewChild('container'),
    __metadata("design:type", core_1.ElementRef)
], TileViewerComponent.prototype, "container", void 0);
__decorate([
    core_1.HostListener('window:resize', ['$event']),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], TileViewerComponent.prototype, "onResize", null);
TileViewerComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'tr-tile-viewer',
        template: "\n    <div #container id=\"tileViewer\" style=\"width: 100%;\"></div>\n  ",
        styleUrls: []
    })
], TileViewerComponent);
exports.TileViewerComponent = TileViewerComponent;
//# sourceMappingURL=tile-viewer.component.js.map