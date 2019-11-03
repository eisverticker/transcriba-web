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
var tei_element_1 = require("./tei-element");
var TeiContainerComponent = (function () {
    function TeiContainerComponent() {
        this.save = new core_1.EventEmitter();
        this.publish = new core_1.EventEmitter();
        this.abort = new core_1.EventEmitter();
    }
    TeiContainerComponent.prototype.onResize = function ($event) {
        this.fitViewPort();
    };
    TeiContainerComponent.prototype.saveContent = function () {
        this.save.emit(this.content);
    };
    TeiContainerComponent.prototype.publishContent = function () {
        this.publish.emit(this.content);
    };
    TeiContainerComponent.prototype.ngAfterViewInit = function () {
        this.fitViewPort();
    };
    TeiContainerComponent.prototype.abortTranscription = function () {
        this.abort.emit();
    };
    TeiContainerComponent.prototype.fitViewPort = function () {
        // values are not being used yet but could be useful later
        // let rectOuter = this.container.nativeElement.getBoundingClientRect();
        var rectInner = this.contentContainer.nativeElement.getBoundingClientRect();
        // console.log(rectOuter, rectInner, difference);
        var viewPortHeight = window.innerHeight;
        var newHeight = (viewPortHeight - rectInner.top - 145) + 'px';
        this.contentContainer.nativeElement.style.maxHeight = newHeight;
        // this.contentContainer.nativeElement.style.height = newHeight;
    };
    return TeiContainerComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], TeiContainerComponent.prototype, "label", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", tei_element_1.TeiElement)
], TeiContainerComponent.prototype, "content", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], TeiContainerComponent.prototype, "editable", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], TeiContainerComponent.prototype, "markDirty", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], TeiContainerComponent.prototype, "save", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], TeiContainerComponent.prototype, "publish", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], TeiContainerComponent.prototype, "abort", void 0);
__decorate([
    core_1.ViewChild('container'),
    __metadata("design:type", core_1.ElementRef)
], TeiContainerComponent.prototype, "container", void 0);
__decorate([
    core_1.ViewChild('contentContainer'),
    __metadata("design:type", core_1.ElementRef)
], TeiContainerComponent.prototype, "contentContainer", void 0);
__decorate([
    core_1.HostListener('window:resize', ['$event']),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], TeiContainerComponent.prototype, "onResize", null);
TeiContainerComponent = __decorate([
    core_1.Component({
        selector: 'tr-tei-container',
        template: "\n  <div #container class=\"panel panel-primary\" [class.panel-primary]=\"editable\" [class.panel-default]=\"!editable\">\n    <div class=\"panel-heading big-panel-heading\">\n      Transkription <span *ngIf=\"label\">- {{ label }}</span>\n    </div>\n    <div #contentContainer class=\"panel-body bg-info\" style=\"overflow-y: auto;\">\n      <tr-tei-root [markDirty]=\"markDirty\" [editable]=\"editable\" *ngIf=\"content\" [(ngModel)]=\"content\"></tr-tei-root>\n    </div>\n    <div class=\"panel-footer\">\n      <div *ngIf=\"editable\">\n        <button (click)=\"saveContent()\" class=\"btn btn-default\">{{ 'action.save' | translate }}</button>\n        <button (click)=\"publishContent()\" class=\"btn btn-primary\">{{ 'action.publish' | translate }}</button>\n        <button (click)=\"abortTranscription()\" class=\"btn btn-danger\">{{ 'action.abort' | translate }}</button>\n      </div>\n      <div *ngIf=\"!editable\">\n        <div class=\"alert alert-warning\" role=\"alert\">\n          {{ 'message.readOnlyMode' | translate }}\n        </div>\n      </div>\n    </div>\n  </div>\n  "
    })
], TeiContainerComponent);
exports.TeiContainerComponent = TeiContainerComponent;
//# sourceMappingURL=tei-container.component.js.map