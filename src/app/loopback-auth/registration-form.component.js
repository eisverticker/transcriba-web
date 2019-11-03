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
var RegistrationFormComponent = (function () {
    function RegistrationFormComponent(auth, notify) {
        this.auth = auth;
        this.notify = notify;
        this.done = new core_1.EventEmitter();
        this.user = user_1.User.createEmptyUser(); // ()
        this.isRegistering = false; // ()
        this.isLastRegistrationFailed = false; // ()
        this.passwordCheck = '';
        // is true if both password field values match
        //   except they are empty
        this.isPasswordMatching = false;
    }
    RegistrationFormComponent.prototype.register = function () {
        var _this = this;
        if (this.isPasswordMatching) {
            this.isRegistering = true;
            this.auth.register(this.user).then(function () {
                _this.notify.notify(notification_1.Notification.message('request.registrationSucceeded'));
                _this.isRegistering = false;
                _this.done.emit(null);
            }, function (err) {
                _this.isRegistering = false;
                if (err === 'Timeout') {
                    _this.notify.notify(notification_1.Notification.timeout());
                }
                else {
                    _this.notify.notify(new notification_1.Notification('request.registrationFailed', ['fail']));
                }
            });
        }
    };
    RegistrationFormComponent.prototype.matchPasswords = function () {
        this.isPasswordMatching = this.user.password === this.passwordCheck;
    };
    return RegistrationFormComponent;
}());
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], RegistrationFormComponent.prototype, "done", void 0);
RegistrationFormComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'usr-registration',
        templateUrl: 'registration-form.component.html',
        styleUrls: []
    }),
    __metadata("design:paramtypes", [auth_service_1.AuthService,
        notification_service_1.NotificationService])
], RegistrationFormComponent);
exports.RegistrationFormComponent = RegistrationFormComponent;
//# sourceMappingURL=registration-form.component.js.map