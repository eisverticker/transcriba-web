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
var revision_1 = require("./revision");
var TranscriptionService = (function () {
    function TranscriptionService(http, backend, auth) {
        this.http = http;
        this.backend = backend;
        this.auth = auth;
    }
    /**
     * Tries to start the Transcription which means
     * that it occupies the object and fetchen the data of the
     * new cloned revision (which the user has write permissions to)
     */
    TranscriptionService.prototype.start = function (objId) {
        var token = this.auth.token;
        var url = this.backend.authUrl('TranscribaObjects/' + objId + '/occupy', token);
        return this.http.post(url, {})
            .map(function (data) { return data.json(); })
            .toPromise()
            .then(function (data) { return new revision_1.Revision(data.id, data.approved, data.createdAt, data.metadata, data.content, data.published, data.ownerId); });
    };
    /**
     * Saves editor data to the latest revision
     */
    TranscriptionService.prototype.save = function (objId, content) {
        var token = this.auth.token;
        var url = this.backend.authUrl('TranscribaObjects/' + objId + '/save', token);
        return this.http.post(url, content)
            .map(function (data) { return data.json(); })
            .toPromise();
    };
    /**
     * Finish the work on the current revision
     */
    TranscriptionService.prototype.publish = function (objId, content) {
        var token = this.auth.token;
        var url = this.backend.authUrl('TranscribaObjects/' + objId + '/publish', token);
        return this.http.post(url, content)
            .map(function (data) { return data.json(); })
            .toPromise();
    };
    /**
     * Aborts the transcription of the current user
     * (deletes revision and frees object/user)
     */
    TranscriptionService.prototype.abort = function () {
        var token = this.auth.token;
        var url = this.backend.authUrl('TranscribaObjects/free', token);
        return this.http.post(url, {})
            .map(function (data) { return data.json(); })
            .toPromise();
    };
    return TranscriptionService;
}());
TranscriptionService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http,
        backend_helper_1.BackendHelper,
        auth_service_1.AuthService])
], TranscriptionService);
exports.TranscriptionService = TranscriptionService;
//# sourceMappingURL=transcription.service.js.map