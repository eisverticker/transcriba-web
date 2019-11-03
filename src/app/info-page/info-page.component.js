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
var InfoPageComponent = (function () {
    function InfoPageComponent() {
    }
    return InfoPageComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", info_page_1.InfoPage)
], InfoPageComponent.prototype, "page", void 0);
InfoPageComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'tr-info-page',
        template: "\n    <div [innerHTML]=\"page.content\"></div>\n  ",
        styleUrls: []
    })
], InfoPageComponent);
exports.InfoPageComponent = InfoPageComponent;
//# sourceMappingURL=info-page.component.js.map