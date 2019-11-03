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
var http_1 = require("@angular/http");
var backend_helper_1 = require("../utilities/backend-helper");
var user_1 = require("./user");
var role_1 = require("./role");
var auth_service_1 = require("./auth.service");
var UserService = (function () {
    function UserService(http, backend, auth) {
        this.http = http;
        this.backend = backend;
        this.auth = auth;
    }
    UserService.prototype.loadUserCount = function () {
        var token = this.auth.token;
        var url = this.backend.authUrl('AppUsers/count', token);
        return this.http.get(url)
            .map(function (data) { return data.json().count; })
            .toPromise();
    };
    UserService.prototype.loadUserPage = function (page, itemsPerPage) {
        var _this = this;
        var token = this.auth.token;
        var url = this.backend.authUrl('AppUsers', token, 'filter[order]=username&filter[limit]=' + itemsPerPage + '&filter[skip]=' + itemsPerPage * page);
        return this.http.get(url)
            .timeout(5000)
            .map(function (data) { return data.json(); })
            .toPromise()
            .then(function (users) {
            users = users.map(function (u) { return new user_1.User(u.username, u.email, '', [], u.id); });
            return _this.includeUserRoles(users, 0);
        });
    };
    UserService.prototype.giveUserRole = function (user, roleName) {
        console.log('giveUserRole', user);
        var token = this.auth.token;
        var url = this.backend.authUrl('AppUsers/roles', token);
        return this.http.post(url, {
            'id': user.id,
            'rolename': roleName
        }).toPromise();
    };
    /**
     * Load all available user roles
     * (roles are static for now)
     */
    UserService.prototype.loadRoles = function () {
        // let token = this.auth.token;
        // let url = this.backend.authUrl('Roles', token);
        // this.http.get(url);
        return Promise.resolve(role_1.Role.getAvailableRoles());
    };
    UserService.prototype.delete = function (user) {
        if (user.id === undefined) {
            throw 'can\'t remove a user without userId';
        }
        var token = this.auth.token;
        var url = this.backend.authUrl('AppUsers/' + user.id, token);
        return this.http.delete(url).timeout(5000).toPromise();
    };
    /**
     * Add roles to users
     *  Necessary becaus of some loopback-mongodb-connector bug which
     *  hinders us from using include filters for user requests
     */
    UserService.prototype.includeUserRoles = function (users, currentUser) {
        var _this = this;
        if (currentUser <= users.length - 1) {
            var u_1 = users[currentUser];
            return this.auth.getRoles(u_1.id).then(function (roles) {
                if (roles.length === 0) {
                    u_1.roles = [new role_1.Role('none')];
                }
                else {
                    u_1.roles = roles;
                }
                return _this.includeUserRoles(users, currentUser + 1);
            });
        }
        else {
            return Promise.resolve(users);
        }
    };
    return UserService;
}());
UserService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http,
        backend_helper_1.BackendHelper,
        auth_service_1.AuthService])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map