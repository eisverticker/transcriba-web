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
var SubNavbarComponent = (function () {
    function SubNavbarComponent() {
        this.items = [];
    }
    return SubNavbarComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", Array)
], SubNavbarComponent.prototype, "items", void 0);
SubNavbarComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'ut-sub-navbar',
        template: "\n    <ul style=\"margin-bottom: 20px;\" class=\"nav nav-pills\">\n      <li *ngFor=\"let item of items\" role=\"presentation\" routerLinkActive=\"active\" [routerLinkActiveOptions]=\"{exact: true}\">\n        <a [routerLink]=\"item.route\">{{ item.name | translate }}</a>\n      </li>\n    </ul>\n  ",
        styleUrls: []
    })
], SubNavbarComponent);
exports.SubNavbarComponent = SubNavbarComponent;
//# sourceMappingURL=sub-navbar.component.js.map