"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tei_element_1 = require("./tei-element");
var TeiBase = (function () {
    function TeiBase() {
        this.tei = new tei_element_1.TeiElement('page', {}, []);
        this.propagateChange = function (value) { };
        // Placeholders for the callbacks which are later provided
        // by the Control Value Accessor
        this.onTouchedCallback = function (value) { };
    }
    /* ngModel (ControlValueAccessor) */
    TeiBase.prototype.writeValue = function (value) {
        if (value !== null && value !== undefined) {
            this.tei = value;
        }
    };
    TeiBase.prototype.registerOnChange = function (fn) {
        this.propagateChange = fn;
    };
    TeiBase.prototype.setDisabledState = function (isDisabled) {
        // empty
    };
    TeiBase.prototype.registerOnTouched = function (fn) {
        this.onTouchedCallback = fn;
    };
    return TeiBase;
}());
exports.TeiBase = TeiBase;
//# sourceMappingURL=tei-base.js.map