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
var form_request_handling_1 = require("../utilities/form-request-handling");
var discussion_service_1 = require("../discussion/discussion.service");
var auth_service_1 = require("../loopback-auth/auth.service");
var comment_1 = require("./comment");
var Rx_1 = require("rxjs/Rx");
var DiscussionComponent = (function (_super) {
    __extends(DiscussionComponent, _super);
    function DiscussionComponent(discuss, auth) {
        var _this = _super.call(this) || this;
        _this.discuss = discuss;
        _this.auth = auth;
        _this.currentPage = 0;
        _this.newComment = comment_1.Comment.createEmptyComment();
        return _this;
    }
    DiscussionComponent.prototype.ngOnChanges = function (changes) {
        this.update();
    };
    DiscussionComponent.prototype.setPage = function (page) {
        this.currentPage = page;
        this.update();
    };
    DiscussionComponent.prototype.addComment = function () {
        var _this = this;
        var commentRequest = this.discuss.saveComment(this.discussion, this.newComment);
        this.watchRequestState(commentRequest);
        commentRequest.then(function () {
            _this.newComment = comment_1.Comment.createEmptyComment();
            return _this.update();
        }, function (err) { return console.log('fehler beim kommentieren', err); });
    };
    DiscussionComponent.prototype.loadDiscussionAndUserData = function () {
        return Rx_1.Observable.zip(this.auth.loadUser(), this.discuss.loadNumOfComments(this.discussion), this.discuss.loadCommentPage(this.discussion, this.currentPage, this.itemsPerPage), function (user, numOfComments, comments) {
            return {
                'user': user,
                'numOfComments': numOfComments,
                'comments': comments
            };
        });
    };
    DiscussionComponent.prototype.setNumberOfPages = function () {
        this.numOfPages = Math.ceil(this.numOfComments / this.itemsPerPage);
    };
    DiscussionComponent.prototype.update = function () {
        var _this = this;
        return this.discuss.loadByID(this.discussionId).then(function (discussion) {
            _this.discussion = discussion;
            _this.loadDiscussionAndUserData().subscribe(function (data) {
                _this.comments = data.comments;
                _this.user = data.user;
                _this.numOfComments = data.numOfComments;
                _this.setNumberOfPages();
            }, function (err) { return console.log(err); });
        }, function (err) {
            console.log('update fehlgeschlagen', err);
            throw err;
        });
    };
    return DiscussionComponent;
}(form_request_handling_1.FormRequestHandling));
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], DiscussionComponent.prototype, "discussionId", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Number)
], DiscussionComponent.prototype, "itemsPerPage", void 0);
DiscussionComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'tr-simple-discussion',
        templateUrl: 'discussion.component.html',
        styleUrls: []
    }),
    __metadata("design:paramtypes", [discussion_service_1.DiscussionService,
        auth_service_1.AuthService])
], DiscussionComponent);
exports.DiscussionComponent = DiscussionComponent;
//# sourceMappingURL=discussion.component.js.map