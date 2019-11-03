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
var user_1 = require("../loopback-auth/user");
var core_1 = require("@angular/core");
var VotingService = (function () {
    function VotingService(http, backend, auth) {
        this.http = http;
        this.backend = backend;
        this.auth = auth;
    }
    /**
     * Vote for something
     */
    VotingService.prototype.vote = function (context, voteType) {
        var token = this.auth.token;
        var url = this.backend.authUrl('Votings/vote', token);
        return this.http.post(url, {
            'objectType': context.objectType,
            'objectId': context.objectId,
            'vote': voteType
        })
            .toPromise();
    };
    /**
     * Remove the given vote from the server
     */
    VotingService.prototype.unvote = function (context) {
        var _this = this;
        var token = this.auth.token;
        var url;
        return this.loadVotingIdentifier(context).then(function (id) {
            url = _this.backend.authUrl('Votings/' + id, token);
            return _this.http.delete(url).toPromise();
        });
    };
    /**
     * Count votings for something
     */
    VotingService.prototype.count = function (context, voteType) {
        var token = this.auth.token;
        var url = this.backend.authUrl('Votings/count', token, 'filter[where][objectType]=' + context.objectType +
            '&filter[where][objectId]=' + context.objectId +
            '&filter[where][vote]=' + voteType);
        return this.http.get(url)
            .map(function (response) { return response.json().count; })
            .toPromise();
    };
    /**
     * Load all users who have voted for a given voteType
     */
    VotingService.prototype.loadUsers = function (context, voteType) {
        var token = this.auth.token;
        var url = this.backend.authUrl('Votings', token, 'filter[where][objectType]=' + context.objectType +
            '&filter[where][objectId]=' + context.objectId +
            '&filter[where][vote]=' + voteType +
            '&filter[include]=appUser');
        return this.http.get(url)
            .map(function (response) { return response.json(); })
            .toPromise()
            .then(function (votings) { return votings.map(function (voting) { return voting.appUser; }); } // map to appUser
        ).then(function (users) { return users.map(function (user) { return new user_1.User(user.username, user.email, '', [], user.id); }); });
    };
    /**
     * Returns in a promise the voting state of the current user
     * if the user didn't vote for anything then the returned state is 'none'
     */
    VotingService.prototype.loadVote = function (context) {
        var _this = this;
        var token = this.auth.token;
        var url;
        // we need the userId of the currently logged in user for the query first
        return this.auth.loadUser().then(function (user) {
            url = _this.backend.authUrl('Votings', token, 'filter[where][objectType]=' + context.objectType +
                '&filter[where][objectId]=' + context.objectId +
                '&filter[where][userId]=' + user.id);
        }).then(// find the user and return the id only
        function () { return _this.http.get(url)
            .map(function (response) { return response.json(); })
            .toPromise(); }).then(function (votings) {
            if (votings.length === 0) {
                return 'none';
            }
            else {
                return votings[0].vote;
            }
        });
    };
    /**
     * Loads the id of the database entity which belongs to the current user
     * and voting context
     */
    VotingService.prototype.loadVotingIdentifier = function (context) {
        var _this = this;
        var token = this.auth.token;
        var url;
        // we need the userId of the currently logged in user for the query first
        return this.auth.loadUser().then(function (user) {
            url = _this.backend.authUrl('Votings/findOne', token, 'filter[where][objectType]=' + context.objectType +
                '&filter[where][objectId]=' + context.objectId +
                '&filter[where][userId]=' + user.id);
        }).then(// return the id only
        function () { return _this.http.get(url)
            .map(function (response) { return response.json().id; })
            .toPromise(); });
    };
    return VotingService;
}());
VotingService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http,
        backend_helper_1.BackendHelper,
        auth_service_1.AuthService])
], VotingService);
exports.VotingService = VotingService;
//# sourceMappingURL=voting.service.js.map