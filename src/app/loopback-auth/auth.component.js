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
var router_1 = require("@angular/router");
var auth_service_1 = require("./auth.service");
var user_1 = require("./user");
var AuthComponent = (function () {
    function AuthComponent(route, router, auth) {
        this.route = route;
        this.router = router;
        this.auth = auth;
        this.mode = 'loading'; // (un)authorized, register and loading
    }
    AuthComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.data.subscribe(function (data) {
            _this.auth.loadUser().then(function (user) {
                if (user_1.User.isGuest(user)) {
                    if (data['mode'] === 'register') {
                        _this.mode = 'register';
                    }
                    else if (data['mode'] === 'reset') {
                        _this.mode = 'reset';
                    }
                    else {
                        _this.mode = 'unauthenticated';
                    }
                }
                else {
                    _this.mode = 'authenticated';
                }
            });
        });
    };
    AuthComponent.prototype.finishLogin = function () {
        this.mode = 'authenticated';
        this.router.navigate(['']);
    };
    AuthComponent.prototype.finishLogout = function () {
        this.mode = 'unauthenticated';
    };
    AuthComponent.prototype.finishRegistration = function () {
        this.mode = 'verify';
    };
    AuthComponent.prototype.finishReset = function () {
        this.router.navigate(['login']);
    };
    return AuthComponent;
}());
AuthComponent = __decorate([
    core_1.Component({
        selector: 'usr-auth',
        template: "\n  <div [ngSwitch]=\"mode\">\n    <ut-be-patient *ngSwitchCase=\"'loading'\"></ut-be-patient>\n    <usr-login (done)=\"finishLogin()\" *ngSwitchCase=\"'unauthenticated'\"></usr-login>\n    <usr-logout (done)=\"finishLogout()\" *ngSwitchCase=\"'authenticated'\"></usr-logout>\n    <usr-registration (done)=\"finishRegistration()\" *ngSwitchCase=\"'register'\"></usr-registration>\n    <usr-email-verification *ngSwitchCase=\"'verify'\"></usr-email-verification>\n    <usr-password-reset (done)=\"finishReset()\" *ngSwitchCase=\"'reset'\"></usr-password-reset>\n  </div>\n\n  ",
        styleUrls: []
    }),
    __metadata("design:paramtypes", [router_1.ActivatedRoute,
        router_1.Router,
        auth_service_1.AuthService])
], AuthComponent);
exports.AuthComponent = AuthComponent;
//# sourceMappingURL=auth.component.js.map