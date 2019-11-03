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
var source_service_1 = require("./source.service");
var notification_service_1 = require("../utilities/notification.service");
var notification_1 = require("../utilities/notification");
var SourceComponent = (function () {
    function SourceComponent(sourceService, notify) {
        this.sourceService = sourceService;
        this.notify = notify;
        this.sources = [];
    }
    SourceComponent.prototype.ngOnInit = function () {
        this.updateSources();
    };
    SourceComponent.prototype.updateSources = function () {
        var _this = this;
        return this.sourceService.loadAllSources().then(function (sources) { return _this.sources = sources; }, function (err) { return _this.notify.notify(new notification_1.Notification('request.fail', ['fail'])); });
    };
    SourceComponent.prototype.deactivate = function (source) {
        var _this = this;
        source.activated = false;
        this.sourceService.save(source).then(function () { return _this.updateSources(); }, function () { return _this.notify.notify(new notification_1.Notification('request.fail', ['fail'])); });
    };
    SourceComponent.prototype.activate = function (source) {
        var _this = this;
        source.activated = true;
        this.sourceService.save(source).then(function () { return _this.updateSources(); }, function () { return _this.notify.notify(new notification_1.Notification('request.fail', ['fail'])); });
    };
    return SourceComponent;
}());
SourceComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'tr-table-of-sources',
        templateUrl: 'source.component.html',
        styleUrls: []
    }),
    __metadata("design:paramtypes", [source_service_1.SourceService,
        notification_service_1.NotificationService])
], SourceComponent);
exports.SourceComponent = SourceComponent;
//# sourceMappingURL=source.component.js.map