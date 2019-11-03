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
var Rx_1 = require("rxjs/Rx");
var LayoutType;
(function (LayoutType) {
    LayoutType[LayoutType["wide"] = 0] = "wide";
    LayoutType[LayoutType["fixed"] = 1] = "fixed";
})(LayoutType = exports.LayoutType || (exports.LayoutType = {}));
var AppService = (function () {
    function AppService() {
        // Initalizing Reactive Components (Observables)
        this.layoutSubject = new Rx_1.BehaviorSubject(LayoutType.fixed);
        this.layout = this.layoutSubject.asObservable();
    }
    AppService.prototype.setLayoutType = function (type) {
        this.layoutSubject.next(type);
    };
    AppService.prototype.resetLayout = function () {
        this.layoutSubject.next(LayoutType.fixed);
    };
    return AppService;
}());
AppService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [])
], AppService);
exports.AppService = AppService;
//# sourceMappingURL=app.service.js.map