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
var auth_service_1 = require("./auth.service");
var notification_service_1 = require("../utilities/notification.service");
var notification_1 = require("../utilities/notification");
var LogoutComponent = (function () {
    function LogoutComponent(auth, notify) {
        this.auth = auth;
        this.notify = notify;
        this.done = new core_1.EventEmitter();
        this.isLoggingOut = false;
    }
    LogoutComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.auth.loadUser().then(function (user) { return _this.user = user; });
    };
    LogoutComponent.prototype.doLogout = function () {
        var _this = this;
        this.isLoggingOut = true;
        this.auth.logout().then(function () {
            _this.notify.notify(new notification_1.Notification('message.goodbye', ['info']));
            _this.isLoggingOut = false;
            _this.done.emit(null);
        }, function (err) {
            _this.isLoggingOut = true;
            if (err === 'Timeout') {
                _this.notify.notify(notification_1.Notification.timeout());
            }
            else {
                _this.notify.notify(notification_1.Notification.message('request.logoutFailed'));
            }
        });
    };
    return LogoutComponent;
}());
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], LogoutComponent.prototype, "done", void 0);
LogoutComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'usr-logout',
        templateUrl: 'logout.component.html',
        styleUrls: []
    }),
    __metadata("design:paramtypes", [auth_service_1.AuthService,
        notification_service_1.NotificationService])
], LogoutComponent);
exports.LogoutComponent = LogoutComponent;
//# sourceMappingURL=logout.component.js.map