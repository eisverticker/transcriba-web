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
var http_1 = require("@angular/http");
var backend_helper_1 = require("../utilities/backend-helper");
var auth_service_1 = require("../loopback-auth/auth.service");
var core_1 = require("@angular/core");
var ImageViewerService = (function () {
    function ImageViewerService(http, backend, auth) {
        this.http = http;
        this.backend = backend;
        this.auth = auth;
    }
    ImageViewerService.prototype.loadNumOfZoomLevels = function (id) {
        var token = this.auth.token;
        var url = this.backend.authUrl('TranscribaObjects/' + id + '/zoomsteps', token);
        return this.http.get(url)
            .map(function (data) { return data.json(); })
            .toPromise();
    };
    return ImageViewerService;
}());
ImageViewerService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http,
        backend_helper_1.BackendHelper,
        auth_service_1.AuthService])
], ImageViewerService);
exports.ImageViewerService = ImageViewerService;
//# sourceMappingURL=image-viewer.service.js.map