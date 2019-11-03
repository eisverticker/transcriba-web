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
var app_service_1 = require("../utilities/app.service");
var EditorComponent = (function () {
    function EditorComponent(app) {
        this.app = app;
        this.labels = [];
        this.editable = false;
        this.enableStarter = false;
        this.save = new core_1.EventEmitter();
        this.publish = new core_1.EventEmitter();
        this.abort = new core_1.EventEmitter();
        this.start = new core_1.EventEmitter();
        this.isInit = false;
    }
    EditorComponent.prototype.ngOnChanges = function (changes) {
        if (this.contents && this.contents.length > 2) {
            throw 'too many contents given';
        }
        this.app.setLayoutType(app_service_1.LayoutType.wide);
    };
    EditorComponent.prototype.saveContent = function () {
        this.save.emit(this.contents[0]);
    };
    EditorComponent.prototype.publishContent = function () {
        this.publish.emit(this.contents[0]);
    };
    EditorComponent.prototype.abortTranscription = function () {
        this.abort.emit();
    };
    EditorComponent.prototype.starter = function () {
        this.start.emit();
    };
    EditorComponent.prototype.ngOnDestroy = function () {
        this.app.resetLayout();
    };
    return EditorComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", Array)
], EditorComponent.prototype, "contents", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Array)
], EditorComponent.prototype, "labels", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], EditorComponent.prototype, "objectId", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], EditorComponent.prototype, "editable", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], EditorComponent.prototype, "enableStarter", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Array)
], EditorComponent.prototype, "markDirty", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], EditorComponent.prototype, "save", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], EditorComponent.prototype, "publish", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], EditorComponent.prototype, "abort", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], EditorComponent.prototype, "start", void 0);
EditorComponent = __decorate([
    core_1.Component({
        selector: 'tr-tei-editor',
        template: "\n  <div *ngIf=\"objectId && contents\" class=\"row\">\n    <div class=\"hidden-xs\" [class.col-sm-6]=\"contents.length==1\" [class.col-sm-4]=\"contents.length==2\">\n      <tr-image-viewer [objectId]=\"objectId\"></tr-image-viewer>\n    </div>\n    <div *ngFor=\"let content of contents; let i = index\" [class.col-sm-6]=\"contents.length==1\" [class.col-sm-4]=\"contents.length==2\">\n      <div *ngIf=\"enableStarter\" style=\"margin-bottom: 10px;\">\n        <button (click)=\"starter()\"  class=\"btn btn-default\">\n          An Transkription weiterarbeiten\n        </button>\n      </div>\n      <tr-tei-container\n        (save)=\"saveContent($event)\"\n        (publish)=\"publishContent($event)\"\n        (abort)=\"abortTranscription()\"\n        [label]=\"labels[i]\"\n        [content]=\"contents[i]\"\n        [markDirty]=\"markDirty[i]\"\n        [editable]=\"editable\">\n      </tr-tei-container>\n    </div>\n  </div>\n\n  ",
        styleUrls: []
    }),
    __metadata("design:paramtypes", [app_service_1.AppService])
], EditorComponent);
exports.EditorComponent = EditorComponent;
//# sourceMappingURL=editor.component.js.map