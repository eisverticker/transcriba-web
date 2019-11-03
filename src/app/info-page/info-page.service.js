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
var info_page_1 = require("./info-page");
var discussion_service_1 = require("../discussion/discussion.service");
var InfoPageService = (function () {
    function InfoPageService(http, backend, auth, discuss) {
        this.http = http;
        this.backend = backend;
        this.auth = auth;
        this.discuss = discuss;
    }
    InfoPageService.prototype.loadAll = function () {
        var token = this.auth.token;
        var url = this.backend.authUrl('InfoPages', token);
        return this.http.get(url)
            .map(function (data) { return data.json(); })
            .toPromise()
            .then(function (data) { return data.map(function (p) { return new info_page_1.InfoPage(p.name, p.content, p.show_discussion, p.discussionId, p.id); }); });
    };
    InfoPageService.prototype.loadOneByID = function (id) {
        var token = this.auth.token;
        var url = this.backend.authUrl('InfoPages/' + id, token);
        return this.http.get(url)
            .map(function (data) { return data.json(); })
            .toPromise()
            .then(function (p) { return new info_page_1.InfoPage(p.name, p.content, p.show_discussion, p.discussionId, id); });
    };
    InfoPageService.prototype.loadOneByName = function (name) {
        var token = this.auth.token;
        var url = this.backend.authUrl('InfoPages/parsed/' + name, token);
        return this.http.get(url)
            .map(function (data) { return data.json(); })
            .toPromise()
            .then(function (data) {
            var p = data.page;
            return new info_page_1.InfoPage(p.name, p.content, p.show_discussion, p.discussionId, p.id);
        });
    };
    InfoPageService.prototype.save = function (page) {
        var token = this.auth.token;
        var url;
        var data = {
            'name': page.name,
            'content': page.content,
            'show_discussion': page.show_discussion
        };
        if (page.id === undefined) {
            url = this.backend.authUrl('InfoPages', token);
            /*return this.discuss.startDiscussion().then(
              (discussion) => {
                data['discussionId'] = discussion.id;
      
              }
            );*/
            return this.http.put(url, data).toPromise();
        }
        else {
            url = this.backend.authUrl('InfoPages/' + page.id, token);
            data['discussionId'] = page.discussionID;
            return this.http.put(url, data).toPromise();
        }
    };
    InfoPageService.prototype.delete = function (page) {
        var token = this.auth.token;
        var url = this.backend.authUrl('InfoPages/' + page.id, token);
        return this.http.delete(url).toPromise();
    };
    return InfoPageService;
}());
InfoPageService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http,
        backend_helper_1.BackendHelper,
        auth_service_1.AuthService,
        discussion_service_1.DiscussionService])
], InfoPageService);
exports.InfoPageService = InfoPageService;
//# sourceMappingURL=info-page.service.js.map