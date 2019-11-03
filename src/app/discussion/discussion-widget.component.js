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
var discussion_service_1 = require("../discussion/discussion.service");
var DiscussionWidgetComponent = (function () {
    function DiscussionWidgetComponent(discussionService) {
        this.discussionService = discussionService;
    }
    DiscussionWidgetComponent.prototype.ngOnChanges = function (changes) {
        var _this = this;
        this.discussionService.loadByID(this.discussionId).then(function (discussion) { return _this.discussionService.loadCommentPage(discussion, 0, _this.numOfItems).then(function (comments) { return _this.comments = comments; }); }, function (err) { return console.log(err); });
    };
    return DiscussionWidgetComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], DiscussionWidgetComponent.prototype, "discussionId", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Number)
], DiscussionWidgetComponent.prototype, "numOfItems", void 0);
DiscussionWidgetComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'tr-latest-comments',
        template: "\n  <div *ngIf=\"comments\">\n    <tr-simple-comment *ngFor=\"let comment of comments\" [comment]=\"comment\"></tr-simple-comment>\n    <div *ngIf=\"comments.length == 0\">\n      {{ 'message.noCommentsAvailable' | translate }}\n    </div>\n  </div>\n  ",
        styleUrls: []
    }),
    __metadata("design:paramtypes", [discussion_service_1.DiscussionService])
], DiscussionWidgetComponent);
exports.DiscussionWidgetComponent = DiscussionWidgetComponent;
//# sourceMappingURL=discussion-widget.component.js.map