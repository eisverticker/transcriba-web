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
var source_1 = require("./source");
var SourceService = (function () {
    function SourceService(http, backend, auth) {
        this.http = http;
        this.backend = backend;
        this.auth = auth;
    }
    SourceService.prototype.loadAllSources = function () {
        var token = this.auth.token;
        var url = this.backend.authUrl('Sources', token);
        return this.http.get(url)
            .map(function (data) { return data.json(); })
            .toPromise()
            .then(function (data) { return data.map(function (s) { return new source_1.Source(s.title, s.url, s.info_url, s.logo_url, s.api_type, s.sync, s.activated, s.id); }); });
    };
    // deprecated (alias for loadByID)
    SourceService.prototype.loadSourceByID = function (id) {
        console.log('loadSourceByID ist deprecated, use loadByID instead');
        return this.loadByID(id);
    };
    SourceService.prototype.loadByID = function (id) {
        var token = this.auth.token;
        var url = this.backend.authUrl('Sources/' + id, token);
        return this.http.get(url)
            .map(function (data) { return data.json(); })
            .toPromise()
            .then(function (s) { return new source_1.Source(s.title, s.url, s.info_url, s.logo_url, s.api_type, s.sync, s.activated, s.id); });
    };
    SourceService.prototype.loadSummaryByID = function (id) {
        var token = this.auth.token;
        var url = this.backend.authUrl('Sources/' + id + '/summary', token);
        return this.http.get(url)
            .map(function (data) { return data.json(); })
            .toPromise()
            .then(function (s) { return new source_1.Source(s.title, '', s.info_url, s.logo_url, '', false, false, s.id); });
    };
    SourceService.prototype.save = function (source) {
        var token = this.auth.token;
        var url;
        if (source.id === undefined) {
            url = this.backend.authUrl('Sources', token);
        }
        else {
            url = this.backend.authUrl('Sources/' + source.id, token);
        }
        var data = {
            'title': source.title,
            'url': source.url,
            'info_url': source.info_url,
            'logo_url': source.logo_url,
            'api_type': source.type,
            'sync': source.sync,
            'activated': source.activated
        };
        return this.http.put(url, data)
            .toPromise();
    };
    return SourceService;
}());
SourceService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http,
        backend_helper_1.BackendHelper,
        auth_service_1.AuthService])
], SourceService);
exports.SourceService = SourceService;
//# sourceMappingURL=source.service.js.map