"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var tei_base_1 = require("./tei-base");
var tei_element_1 = require("./tei-element");
var RootComponent = RootComponent_1 = (function (_super) {
    __extends(RootComponent, _super);
    function RootComponent() {
        return _super.call(this) || this;
    }
    RootComponent.prototype.addPage = function () {
        this.tei.children.push(new tei_element_1.TeiElement('page', {}, []));
    };
    RootComponent.prototype.deleteChild = function (index) {
        this.tei.children = this.tei.children.filter(function (_, i) { return index !== i; });
    };
    return RootComponent;
}(tei_base_1.TeiBase));
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], RootComponent.prototype, "editable", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], RootComponent.prototype, "markDirty", void 0);
RootComponent = RootComponent_1 = __decorate([
    core_1.Component({
        selector: 'tr-tei-root',
        template: "\n    <div *ngIf=\"tei\">\n      <tr-tei-element\n      [markDirty]=\"markDirty\"\n      [editable]=\"editable\"\n      (killMe)=\"deleteChild($event)\"\n      *ngFor=\"let child of tei.children; let i = index\"\n      [index]=\"i\"\n      [(ngModel)]=\"tei.children[i]\">\n      </tr-tei-element>\n      <div class=\"well\" *ngIf=\"tei.children.length == 0\">Diese Transkription ist leer <i class=\"fa fa-frown-o\" aria-hidden=\"true\"></i></div>\n      <button *ngIf=\"editable\" (click)=\"addPage()\" class=\"btn btn-link\">Seite hinzuf\u00FCgen</button>\n    </div>\n  ",
        providers: [
            {
                provide: forms_1.NG_VALUE_ACCESSOR,
                useExisting: core_1.forwardRef(function () { return RootComponent_1; }),
                multi: true
            }
        ]
    }),
    __metadata("design:paramtypes", [])
], RootComponent);
exports.RootComponent = RootComponent;
var RootComponent_1;
//# sourceMappingURL=root.component.js.map