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
var source_1 = require("./source");
var source_service_1 = require("./source.service");
var notification_service_1 = require("../utilities/notification.service");
var notification_1 = require("../utilities/notification");
var router_1 = require("@angular/router");
var SourceDetailsComponent = (function () {
    function SourceDetailsComponent(sourceService, notify, route, router) {
        this.sourceService = sourceService;
        this.notify = notify;
        this.route = route;
        this.router = router;
        this.source = source_1.Source.createEmptySource();
        this.isSaving = false;
        this.isLastSaveFailed = false;
    }
    SourceDetailsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.params.subscribe(function (params) {
            if (params['id'] === 'new') {
                _this.source = source_1.Source.createEmptySource();
            }
            else {
                _this.sourceService.loadByID(params['id']).then(function (source) { return _this.source = source; }, function (err) {
                    _this.notify.notify(new notification_1.Notification('request.fail', ['fail']));
                    _this.router.navigate(['/sources']);
                });
            }
        });
    };
    SourceDetailsComponent.prototype.save = function () {
        var _this = this;
        this.isSaving = true;
        this.sourceService.save(this.source).then(function () {
            _this.notify.notify(new notification_1.Notification('request.success', ['success']));
            _this.router.navigate(['/sources']);
            _this.isSaving = false;
        }, function (err) {
            _this.isLastSaveFailed = true;
            _this.notify.notify(new notification_1.Notification('request.fail', ['fail']));
            _this.isSaving = false;
        });
    };
    return SourceDetailsComponent;
}());
SourceDetailsComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'tr-source-details',
        templateUrl: 'source-details.component.html',
        styleUrls: []
    }),
    __metadata("design:paramtypes", [source_service_1.SourceService,
        notification_service_1.NotificationService,
        router_1.ActivatedRoute,
        router_1.Router])
], SourceDetailsComponent);
exports.SourceDetailsComponent = SourceDetailsComponent;
//# sourceMappingURL=source-details.component.js.map