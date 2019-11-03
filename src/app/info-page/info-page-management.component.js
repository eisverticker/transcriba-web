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
var info_page_service_1 = require("./info-page.service");
var notification_service_1 = require("../utilities/notification.service");
var notification_1 = require("../utilities/notification");
var InfoPageManagementComponent = (function () {
    function InfoPageManagementComponent(pageService, notify) {
        this.pageService = pageService;
        this.notify = notify;
        this.pages = [];
    }
    InfoPageManagementComponent.prototype.ngOnInit = function () {
        this.updateSources();
    };
    InfoPageManagementComponent.prototype.updateSources = function () {
        var _this = this;
        return this.pageService.loadAll().then(function (pages) { return _this.pages = pages; }, function (err) { return _this.notify.notify(new notification_1.Notification('request.fail', ['fail'])); });
    };
    InfoPageManagementComponent.prototype.deletePage = function (page) {
        var _this = this;
        this.pageService.delete(page).then(function () {
            _this.notify.notify(new notification_1.Notification('request.success', ['success']));
            return _this.updateSources();
        }, function (err) { return _this.notify.notify(new notification_1.Notification('request.fail', ['fail'])); });
    };
    return InfoPageManagementComponent;
}());
InfoPageManagementComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'tr-table-of-pages',
        templateUrl: 'info-page-management.component.html',
        styleUrls: []
    }),
    __metadata("design:paramtypes", [info_page_service_1.InfoPageService,
        notification_service_1.NotificationService])
], InfoPageManagementComponent);
exports.InfoPageManagementComponent = InfoPageManagementComponent;
//# sourceMappingURL=info-page-management.component.js.map