"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var EmailValidatorDirective = EmailValidatorDirective_1 = (function () {
    function EmailValidatorDirective() {
    }
    EmailValidatorDirective.prototype.validate = function (c) {
        var regEx = /.{2,20}@.{2,20}\..{2,5}/;
        // (!) null indicates that the value is valid
        return regEx.test(c.value) ? null : {
            validateEmail: {
                valid: false
            }
        };
    };
    return EmailValidatorDirective;
}());
EmailValidatorDirective = EmailValidatorDirective_1 = __decorate([
    core_1.Directive({
        selector: '[utValidateEmail][ngModel]',
        providers: [
            { provide: forms_1.NG_VALIDATORS, useExisting: core_1.forwardRef(function () { return EmailValidatorDirective_1; }), multi: true }
        ]
    })
], EmailValidatorDirective);
exports.EmailValidatorDirective = EmailValidatorDirective;
var EmailValidatorDirective_1;
//# sourceMappingURL=email-validator.directive.js.map