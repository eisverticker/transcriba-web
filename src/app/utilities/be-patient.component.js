"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var Rx_1 = require("rxjs/Rx");
var BePatientComponent = (function () {
    function BePatientComponent() {
        this.isStarted = false;
    }
    BePatientComponent.prototype.ngOnInit = function () {
        var _this = this;
        // wait 200 ms before showing the template (less anoying)
        Rx_1.Observable.timer(200).subscribe(function () {
            _this.isStarted = true;
        });
    };
    return BePatientComponent;
}());
BePatientComponent = __decorate([
    core_1.Component({
        selector: 'ut-be-patient',
        template: "\n  <div *ngIf=\"isStarted\" class=\"text-center\">\n    <i class=\"fa fa-spinner fa-pulse fa-3x fa-fw\"></i>\n    <span class=\"sr-only\">{{ 'message.pleaseWait' | translate }} yeah</span>\n  </div>\n  ",
        styleUrls: []
    })
], BePatientComponent);
exports.BePatientComponent = BePatientComponent;
//# sourceMappingURL=be-patient.component.js.map