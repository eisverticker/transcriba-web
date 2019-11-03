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
var discussion_1 = require("./discussion");
var comment_1 = require("./comment");
var user_1 = require("../loopback-auth/user");
var DiscussionService = (function () {
    function DiscussionService(http, backend, auth) {
        this.http = http;
        this.backend = backend;
        this.auth = auth;
    }
    /**
     * Loads a discussion from the server by id
     */
    DiscussionService.prototype.loadByID = function (id) {
        var token = this.auth.token;
        var url = this.backend.authUrl('Discussions/' + id, token);
        return this.http.get(url)
            .map(function (data) { return data.json(); })
            .toPromise()
            .then(function (data) { return new discussion_1.Discussion(data.title, id); });
    };
    DiscussionService.prototype.loadCommentPage = function (discussion, page, itemsPerPage) {
        var token = this.auth.token;
        var url = this.backend.authUrl('Discussions/' + discussion.id + '/comments', token, 'filter[order]=createdAt DESC' +
            '&filter[include]=appUser' +
            '&filter[limit]=' + itemsPerPage + '&filter[skip]=' + itemsPerPage * page);
        return this.http.get(url)
            .timeout(5000)
            .map(function (data) { return data.json(); })
            .toPromise()
            .then(function (comments) {
            return comments.filter(function (c) { return c.appUser !== undefined; }).map(function (c) {
                var user = user_1.User.createEmptyUser();
                user.name = c.appUser.username;
                user.id = c.appUser.id;
                user.mail = c.appUser.email;
                return new comment_1.Comment(c.content, user, c.createdAt, c.id);
            });
        });
    };
    DiscussionService.prototype.loadNumOfComments = function (discussion) {
        var token = this.auth.token;
        var url = this.backend.authUrl('Discussions/' + discussion.id + '/comments/count', token);
        return this.http.get(url)
            .map(function (data) { return data.json().count; })
            .toPromise();
    };
    /**
     * Adds a comment to the discussion that was given
     */
    DiscussionService.prototype.saveComment = function (discussion, comment) {
        var token = this.auth.token;
        var url = this.backend.authUrl('Discussions/' + discussion.id + '/comments', token);
        return this.http.post(url, {
            'content': comment.content,
            'appUserId': 'none'
        })
            .toPromise();
    };
    return DiscussionService;
}());
DiscussionService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http,
        backend_helper_1.BackendHelper,
        auth_service_1.AuthService])
], DiscussionService);
exports.DiscussionService = DiscussionService;
//# sourceMappingURL=discussion.service.js.map