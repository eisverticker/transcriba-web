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
var backend_helper_1 = require("../utilities/backend-helper");
var image_viewer_service_1 = require("./image-viewer.service");
var ImageViewerComponent = (function () {
    function ImageViewerComponent(backend, viewerService) {
        this.backend = backend;
        this.viewerService = viewerService;
    }
    ImageViewerComponent.prototype.ngOnChanges = function (changes) {
        var _this = this;
        this.viewerService.loadNumOfZoomLevels(this.objectId).then(function (numOfZooms) {
            _this.zoomSteps = numOfZooms - 1;
            _this.url = _this.backend.unAuthUrl('TranscribaObjects/' + _this.objectId + '/tiles/{z}/{x}/{y}');
        }, function (err) { return console.log(err); });
    };
    return ImageViewerComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], ImageViewerComponent.prototype, "objectId", void 0);
ImageViewerComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'tr-image-viewer',
        template: "\n    <tr-tile-viewer *ngIf=\"url && zoomSteps\" [maxZoomLevel]=\"zoomSteps\" [url]=\"url\"></tr-tile-viewer>\n  ",
        styleUrls: []
    }),
    __metadata("design:paramtypes", [backend_helper_1.BackendHelper,
        image_viewer_service_1.ImageViewerService])
], ImageViewerComponent);
exports.ImageViewerComponent = ImageViewerComponent;
//# sourceMappingURL=image-viewer.component.js.map