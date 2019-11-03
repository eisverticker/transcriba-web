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
var editor_service_1 = require("./editor.service");
var TeiElementComponent = TeiElementComponent_1 = (function (_super) {
    __extends(TeiElementComponent, _super);
    function TeiElementComponent(docs) {
        var _this = _super.call(this) || this;
        _this.docs = docs;
        _this.killMe = new core_1.EventEmitter();
        _this.mode = 'default';
        return _this;
    }
    TeiElementComponent.prototype.ngOnInit = function () {
        if (this.tei.isDirty) {
            console.log('mark element of type:' + this.tei.type + ' as dirty');
        }
    };
    TeiElementComponent.prototype.delete = function () {
        this.killMe.emit(this.index);
    };
    TeiElementComponent.prototype.deleteChild = function (index) {
        this.tei.children = this.tei.children.filter(function (_, i) { return index !== i; });
    };
    TeiElementComponent.prototype.focus = function () {
        this.docs.setFocusedElement(this);
        this.tei.isFocused = true;
    };
    TeiElementComponent.prototype.unfocus = function () {
        this.tei.isFocused = false;
    };
    TeiElementComponent.prototype.saveChanges = function () {
        if (this.tei.properties.value !== this.value) {
            this.tei.isDirty = true;
            this.tei.properties.value = this.value;
        }
    };
    TeiElementComponent.prototype.textChange = function (event) {
        this.value = event.target.innerText;
    };
    TeiElementComponent.prototype.addLine = function () {
        var defaultTextPart = new tei_element_1.TeiElement('textPartOrdinary', { value: 'Text' }, []);
        this.tei.children.push(new tei_element_1.TeiElement('line', {}, [defaultTextPart]));
    };
    TeiElementComponent.prototype.addParagraph = function () {
        var defaultTextPart = new tei_element_1.TeiElement('textPartOrdinary', { value: 'Text' }, []);
        var defaultLinePart = new tei_element_1.TeiElement('line', {}, [defaultTextPart]);
        this.tei.children.push(new tei_element_1.TeiElement('paragraph', {}, [defaultLinePart], true));
    };
    TeiElementComponent.prototype.addHeading = function () {
        var defaultTextPart = new tei_element_1.TeiElement('textPartOrdinary', { value: 'Text' }, [], true);
        this.tei.children.push(new tei_element_1.TeiElement('heading', {}, [defaultTextPart]));
    };
    TeiElementComponent.prototype.editText = function () {
        this.mode = 'edit';
        this.value = this.toText();
    };
    TeiElementComponent.prototype.showText = function () {
        var lineStrings = this.value.trim().split('\n');
        lineStrings = lineStrings.filter(function (line) { return line.trim() !== ''; });
        this.value = ''; // empty value
        this.tei.children = lineStrings.map(function (lineString) { return new tei_element_1.TeiElement('line', {}, [
            new tei_element_1.TeiElement('textPartOrdinary', { value: lineString }, [])
        ]); });
        this.mode = 'default';
    };
    TeiElementComponent.prototype.showHeading = function () {
        var lineString = this.value.trim();
        this.value = ''; // empty value
        this.tei.children = [
            new tei_element_1.TeiElement('textPartOrdinary', { value: lineString }, [])
        ];
        this.mode = 'default';
    };
    TeiElementComponent.prototype.editHeading = function () {
        this.mode = 'edit';
        this.value = this.toText();
    };
    TeiElementComponent.prototype.toText = function (tei) {
        var _this = this;
        var text = '';
        if (tei === undefined) {
            tei = this.tei;
        }
        if (['line', 'heading'].indexOf(tei.type) !== -1) {
            tei.children.forEach(function (childTei) { return text += childTei.properties.value; });
        }
        else if (tei.type === 'paragraph') {
            tei.children.forEach(function (el) { return text += _this.toText(el) + '\n'; });
        }
        return text;
    };
    return TeiElementComponent;
}(tei_base_1.TeiBase));
__decorate([
    core_1.Input(),
    __metadata("design:type", Number)
], TeiElementComponent.prototype, "index", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], TeiElementComponent.prototype, "markDirty", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], TeiElementComponent.prototype, "editable", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], TeiElementComponent.prototype, "killMe", void 0);
TeiElementComponent = TeiElementComponent_1 = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'tr-tei-element',
        templateUrl: 'tei-element.component.html',
        providers: [
            {
                provide: forms_1.NG_VALUE_ACCESSOR,
                useExisting: core_1.forwardRef(function () { return TeiElementComponent_1; }),
                multi: true
            }
        ]
    }),
    __metadata("design:paramtypes", [editor_service_1.EditorService])
], TeiElementComponent);
exports.TeiElementComponent = TeiElementComponent;
var TeiElementComponent_1;
//# sourceMappingURL=tei-element.component.js.map