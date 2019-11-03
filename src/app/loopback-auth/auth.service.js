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
var Rx_1 = require("rxjs/Rx");
var user_1 = require("./user");
var role_1 = require("./role");
var AuthService = (function () {
    function AuthService(http, backend) {
        this.http = http;
        this.backend = backend;
        this.isUserInitialized = false;
        // redirect for login (used by guards)
        this.redirectUrl = '/';
        // Initalize Reactive Components (Observables)
        this.userSubject = new Rx_1.BehaviorSubject(user_1.User.createGuest());
        this.user = this.userSubject.asObservable();
    }
    AuthService.prototype.loadUser = function () {
        var _this = this;
        if (this.isUserInitialized) {
            return Promise.resolve(this.userSubject.getValue());
        }
        else {
            return this.authenticateUser().then(function (user) {
                _this.isUserInitialized = true;
                _this.userSubject.next(user);
                return user;
            }, function () {
                _this.isUserInitialized = true;
                return _this.userSubject.getValue();
            });
        }
    };
    AuthService.prototype.login = function (user) {
        var _this = this;
        this.reset(); // delete current token and userid
        this.isUserInitialized = false; // reinitalize user later
        return this.http.post(this.backend.unAuthUrl('AppUsers/login'), {
            'email': user.mail,
            'password': user.password
        })
            .timeout(5000)
            .toPromise()
            .then(function (res) {
            var data = res.json();
            _this.userID = data.userId;
            _this.token = data.id; // save token to localStorage
            _this.loadUser(); // reinitalize user
        }, function (err) {
            if (err === 'Timeout') {
                throw err;
            }
            else if (err.status === 401) {
                return Promise.reject('wrong credentials');
            }
            else {
                throw 'unexpected result 34343-AuthService';
            }
        });
    };
    AuthService.prototype.logout = function () {
        var _this = this;
        return this.http.post(this.backend.authUrl('AppUsers/logout', this.token), {})
            .timeout(5000)
            .toPromise()
            .then(function () {
            _this.reset();
            _this.userSubject.next(user_1.User.createGuest());
        }, function (err) {
            return _this.loadUser();
        });
    };
    AuthService.prototype.verify = function (code) {
        var url = 'AppUsers/confirm?uid=' + this.userID + '&token=' + code;
        return this.http.get(this.backend.authUrl(url, this.token))
            .toPromise();
    };
    AuthService.prototype.resetPassword = function (user) {
        var url = this.backend.unAuthUrl('AppUsers/reset');
        return this.http.post(url, {
            'email': user.mail
        })
            .timeout(5000)
            .toPromise();
    };
    AuthService.prototype.register = function (user) {
        var url = this.backend.unAuthUrl('AppUsers');
        return this.http.post(url, {
            'username': user.name,
            'email': user.mail,
            'password': user.password
        })
            .timeout(5000)
            .toPromise()
            .then(function () {
            return;
        });
    };
    AuthService.prototype.getRoles = function (userID) {
        var url = this.backend.authUrl('AppUsers/' + userID + '/roles', this.token);
        if (this.token === null || userID === null) {
            return Promise.reject('no local user data found');
        }
        else {
            return this.http.get(url)
                .map(function (data) { return data.json(); })
                .toPromise()
                .then(function (roles) {
                var roleNames = roles.map(function (role) { return role.name; });
                var rolesInOrder = role_1.Role.getAvailableRoles().filter(function (role) {
                    return roleNames.indexOf(role.name) !== -1;
                });
                return rolesInOrder;
            }, function (res) {
                return Promise.reject(res);
            });
        }
    };
    Object.defineProperty(AuthService.prototype, "token", {
        get: function () {
            return localStorage.getItem('token');
        },
        set: function (id) {
            localStorage.setItem('token', id);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AuthService.prototype, "userID", {
        get: function () {
            return localStorage.getItem('userID');
        },
        set: function (id) {
            localStorage.setItem('userID', id);
        },
        enumerable: true,
        configurable: true
    });
    AuthService.prototype.reset = function () {
        localStorage.removeItem('token');
        localStorage.removeItem('userID');
    };
    AuthService.prototype.authenticateUser = function () {
        var _this = this;
        var url = this.backend.authUrl('AppUsers/' + this.userID, this.token);
        if (this.token === null || this.userID === null) {
            return Promise.reject('no local user data found');
        }
        else {
            return this.http.get(url)
                .map(function (data) { return data.json(); })
                .toPromise()
                .then(function (data) {
                var user = new user_1.User(data.username, data.email, '', [], data.id);
                return _this.getRoles(_this.userID).then(function (roles) {
                    user.roles = user.roles.concat(roles);
                    return user;
                });
            }, function (res) {
                _this.reset();
                return Promise.reject(res);
            });
        }
    };
    return AuthService;
}());
AuthService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http,
        backend_helper_1.BackendHelper])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map