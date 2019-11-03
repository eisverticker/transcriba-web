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
var ng2_translate_1 = require("ng2-translate");
var DeleteButtonComponent = (function () {
    function DeleteButtonComponent(translate) {
        this.translate = translate;
        this.xclick = new core_1.EventEmitter();
    }
    DeleteButtonComponent.prototype.clicked = function () {
        var _this = this;
        this.translate.get('message.confirmDelete').subscribe(function (confirmDelete) {
            if (confirm(confirmDelete) === true) {
                _this.xclick.emit(null);
            }
        });
    };
    return DeleteButtonComponent;
}());
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], DeleteButtonComponent.prototype, "xclick", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], DeleteButtonComponent.prototype, "disabled", void 0);
DeleteButtonComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'ut-delete-button',
        templateUrl: 'delete-button.component.html',
        styleUrls: []
    }),
    __metadata("design:paramtypes", [ng2_translate_1.TranslateService])
], DeleteButtonComponent);
exports.DeleteButtonComponent = DeleteButtonComponent;
//# sourceMappingURL=delete-button.component.js.map