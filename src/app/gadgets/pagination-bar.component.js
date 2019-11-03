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
var PaginationBarComponent = (function () {
    function PaginationBarComponent() {
        this.pages = [];
        this.pageChanged = new core_1.EventEmitter();
    }
    PaginationBarComponent.prototype.ngOnChanges = function (changes) {
        this.pages = [];
        for (var i = 0; i < this.numOfPages; i++) {
            this.pages.push(i);
        }
    };
    PaginationBarComponent.prototype.getPageWidth = function () {
        return (100 / this.numOfPages).toString() + '%';
    };
    PaginationBarComponent.prototype.openPage = function (page) {
        this.pageChanged.emit(page);
    };
    return PaginationBarComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", Number)
], PaginationBarComponent.prototype, "currentPage", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Number)
], PaginationBarComponent.prototype, "numOfPages", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], PaginationBarComponent.prototype, "pageChanged", void 0);
PaginationBarComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'ut-pagination-bar',
        templateUrl: 'pagination-bar.component.html',
        styleUrls: []
    })
], PaginationBarComponent);
exports.PaginationBarComponent = PaginationBarComponent;
//# sourceMappingURL=pagination-bar.component.js.map