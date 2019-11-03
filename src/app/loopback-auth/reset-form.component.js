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
var user_1 = require("./user");
var notification_service_1 = require("../utilities/notification.service");
var notification_1 = require("../utilities/notification");
var ResetFormComponent = (function () {
    function ResetFormComponent(auth, notify) {
        this.auth = auth;
        this.notify = notify;
        this.done = new core_1.EventEmitter();
        this.user = user_1.User.createEmptyUser(); // ()
        this.isResetting = false; // ()
        this.isLastResetFailed = false; // ()
    }
    ResetFormComponent.prototype.reset = function () {
        var _this = this;
        this.isResetting = true;
        this.auth.resetPassword(this.user).then(function () {
            _this.isResetting = false;
            _this.notify.notify(notification_1.Notification.message('message.emailSent'));
            _this.done.emit(null);
        }, function () {
            _this.isLastResetFailed = true;
            _this.isResetting = false;
        });
    };
    return ResetFormComponent;
}());
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], ResetFormComponent.prototype, "done", void 0);
ResetFormComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'usr-password-reset',
        templateUrl: 'reset-form.component.html',
        styleUrls: []
    }),
    __metadata("design:paramtypes", [auth_service_1.AuthService,
        notification_service_1.NotificationService])
], ResetFormComponent);
exports.ResetFormComponent = ResetFormComponent;
//# sourceMappingURL=reset-form.component.js.map