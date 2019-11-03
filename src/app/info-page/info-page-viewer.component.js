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
var router_1 = require("@angular/router");
var InfoPageViewerComponent = (function () {
    function InfoPageViewerComponent(pageService, router, route) {
        this.pageService = pageService;
        this.router = router;
        this.route = route;
        this.mode = 'loading';
        this.navItems = [];
    }
    InfoPageViewerComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.data.subscribe(function (data) {
            _this.mode = data['mode'];
            _this.route.params.first().subscribe(function (params) { return _this.pageService.loadOneByName(params['id']).then(function (page) {
                _this.page = page;
                _this.initNavigation(page);
            }, function (err) { return _this.router.navigate(['404']); }); });
        });
    };
    InfoPageViewerComponent.prototype.initNavigation = function (page) {
        if (page.show_discussion) {
            this.navItems = [
                {
                    name: 'general.page',
                    route: '/info/' + page.name
                },
                {
                    name: 'general.discussion',
                    route: '/info/' + page.name + '/discussion'
                },
            ];
        }
        else {
            this.navItems = [];
        }
    };
    return InfoPageViewerComponent;
}());
InfoPageViewerComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'tr-info-page-viewer',
        template: "\n    <ut-sub-navbar [items]=\"navItems\"></ut-sub-navbar>\n    <div *ngIf=\"page\" [ngSwitch]=\"mode\">\n      <ut-be-patient *ngSwitchCase=\"'loading'\"></ut-be-patient>\n      <tr-info-page [page]=\"page\" *ngSwitchCase=\"'viewer'\"></tr-info-page>\n      <tr-info-page-discussion [page]=\"page\" *ngSwitchCase=\"'discussion'\"></tr-info-page-discussion>\n    </div>\n  ",
        styleUrls: []
    }),
    __metadata("design:paramtypes", [info_page_service_1.InfoPageService,
        router_1.Router,
        router_1.ActivatedRoute])
], InfoPageViewerComponent);
exports.InfoPageViewerComponent = InfoPageViewerComponent;
//# sourceMappingURL=info-page-viewer.component.js.map