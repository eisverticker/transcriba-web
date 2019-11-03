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
var info_page_1 = require("./info-page");
var info_page_service_1 = require("./info-page.service");
var notification_service_1 = require("../utilities/notification.service");
var notification_1 = require("../utilities/notification");
var router_1 = require("@angular/router");
var InfoPageEditComponent = (function () {
    function InfoPageEditComponent(pageService, notify, route, router) {
        this.pageService = pageService;
        this.notify = notify;
        this.route = route;
        this.router = router;
        this.page = info_page_1.InfoPage.createEmptyPage();
        this.isSaving = false;
        this.isLastAttemptFailed = false;
    }
    InfoPageEditComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.params.subscribe(function (params) {
            if (params['id'] === 'new') {
                _this.page = info_page_1.InfoPage.createEmptyPage();
            }
            else {
                _this.pageService.loadOneByID(params['id']).then(function (page) { return _this.page = page; }, function (err) {
                    _this.notify.notify(new notification_1.Notification('request.fail', ['fail']));
                    _this.router.navigate(['/pages']);
                });
            }
        });
    };
    InfoPageEditComponent.prototype.save = function () {
        var _this = this;
        this.isSaving = true;
        this.pageService.save(this.page).then(function () {
            _this.notify.notify(new notification_1.Notification('request.success', ['success']));
            _this.router.navigate(['/pages']);
            _this.isLastAttemptFailed = false;
            _this.isSaving = false;
        }, function (err) {
            _this.notify.notify(new notification_1.Notification('request.fail', ['fail']));
            _this.isLastAttemptFailed = true;
            _this.isSaving = false;
        });
    };
    return InfoPageEditComponent;
}());
InfoPageEditComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'tr-info-page-edit',
        templateUrl: 'info-page-edit.component.html',
        styleUrls: []
    }),
    __metadata("design:paramtypes", [info_page_service_1.InfoPageService,
        notification_service_1.NotificationService,
        router_1.ActivatedRoute,
        router_1.Router])
], InfoPageEditComponent);
exports.InfoPageEditComponent = InfoPageEditComponent;
//# sourceMappingURL=info-page-edit.component.js.map