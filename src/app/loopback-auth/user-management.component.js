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
var role_1 = require("./role");
var user_service_1 = require("./user.service");
var notification_service_1 = require("../utilities/notification.service");
var notification_1 = require("../utilities/notification");
var UserManagementComponent = (function () {
    function UserManagementComponent(userService, notify) {
        this.userService = userService;
        this.notify = notify;
        this.isReleased = true;
        this.users = [];
        this.roles = [];
        this.page = 0;
        this.isLocked = false;
        this.itemsPerPage = 12;
    }
    UserManagementComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.userService.loadRoles().then(function (roles) {
            roles.push(new role_1.Role('none'));
            _this.roles = roles;
            return _this.updateUserList();
        }).then(function () { return _this.isReleased = true; });
    };
    UserManagementComponent.prototype.setPage = function (page) {
        this.page = page;
        this.updateUserList();
    };
    UserManagementComponent.prototype.updateUserCount = function () {
        var _this = this;
        return this.userService.loadUserCount().then(function (count) {
            _this.numOfPages = Math.ceil(count / _this.itemsPerPage);
        });
    };
    UserManagementComponent.prototype.updateUserList = function () {
        var _this = this;
        return this.userService.loadUserPage(this.page, this.itemsPerPage).then(function (users) {
            _this.users = users;
            return _this.updateUserCount();
        });
    };
    UserManagementComponent.prototype.changeRole = function ($event, user) {
        var _this = this;
        return this.userService.giveUserRole(user, $event.target.value).then(function () { return _this.notify.notify(new notification_1.Notification('request.success', ['success'])); }, function () { return _this.notify.notify(new notification_1.Notification('request.fail', ['fail'])); }).then(function () { return _this.updateUserList(); });
    };
    UserManagementComponent.prototype.deleteUser = function (user) {
        var _this = this;
        this.userService.delete(user).then(function () {
            _this.notify.notify(new notification_1.Notification('request.successfulRemoved', ['success']));
            return _this.updateUserList();
        }, function (err) {
            _this.notify.notify(new notification_1.Notification('request.fail', ['fail']));
            return Promise.reject(err);
        });
    };
    return UserManagementComponent;
}());
UserManagementComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'usr-management',
        templateUrl: 'user-management.component.html',
        styleUrls: []
    }),
    __metadata("design:paramtypes", [user_service_1.UserService,
        notification_service_1.NotificationService])
], UserManagementComponent);
exports.UserManagementComponent = UserManagementComponent;
//# sourceMappingURL=user-management.component.js.map