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
var forms_1 = require("@angular/forms");
var GrowingTextareaComponent = GrowingTextareaComponent_1 = (function () {
    function GrowingTextareaComponent(renderer) {
        this.renderer = renderer;
        this._value = '';
        this.isViewInitialized = false;
        // default callbacks which do nothing (they are being replaced when
        //  someone binds a value to ngModel)
        this.propagateChange = function (value) { };
        this.propagateTouch = function (value) { };
    }
    GrowingTextareaComponent.prototype.ngAfterViewInit = function () {
        this.isViewInitialized = true;
    };
    GrowingTextareaComponent.prototype.ngAfterViewChecked = function () {
        this.grow();
    };
    Object.defineProperty(GrowingTextareaComponent.prototype, "value", {
        get: function () {
            return this._value;
        },
        set: function (value) {
            if (value !== this._value) {
                this._value = value;
                this.propagateChange(value);
            }
        },
        enumerable: true,
        configurable: true
    });
    GrowingTextareaComponent.prototype.grow = function () {
        var ta = this.textarea.nativeElement;
        if (ta.scrollHeight > ta.clientHeight) {
            ta.style.height = ta.scrollHeight + 'px';
        }
    };
    /* ngModel (ControlValueAccessor) */
    GrowingTextareaComponent.prototype.writeValue = function (value) {
        this._value = value;
        if (this.isViewInitialized === true) {
            this.grow();
        }
    };
    GrowingTextareaComponent.prototype.registerOnChange = function (fn) {
        this.propagateChange = fn;
    };
    GrowingTextareaComponent.prototype.setDisabledState = function (isDisabled) {
        // empty
    };
    GrowingTextareaComponent.prototype.registerOnTouched = function (fn) {
        this.propagateTouch = fn;
    };
    return GrowingTextareaComponent;
}());
__decorate([
    core_1.ViewChild('textfield'),
    __metadata("design:type", core_1.ElementRef)
], GrowingTextareaComponent.prototype, "textarea", void 0);
GrowingTextareaComponent = GrowingTextareaComponent_1 = __decorate([
    core_1.Component({
        selector: 'ut-growing-textarea',
        template: "\n    <textarea #textfield class=\"growing-textarea\" [(ngModel)]=\"value\"></textarea>\n  ",
        providers: [
            {
                provide: forms_1.NG_VALUE_ACCESSOR,
                useExisting: core_1.forwardRef(function () { return GrowingTextareaComponent_1; }),
                multi: true
            }
        ]
    }),
    __metadata("design:paramtypes", [core_1.Renderer])
], GrowingTextareaComponent);
exports.GrowingTextareaComponent = GrowingTextareaComponent;
var GrowingTextareaComponent_1;
//# sourceMappingURL=growing-textarea.component.js.map