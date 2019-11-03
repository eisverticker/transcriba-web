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
var comment_voting_service_1 = require("./comment-voting.service");
var comment_1 = require("./comment");
var auth_service_1 = require("../loopback-auth/auth.service");
var CommentComponent = (function () {
    function CommentComponent(voting, auth) {
        this.voting = voting;
        this.auth = auth;
        this.currentVote = 'loading'; // loading, like, dislike, unwanted or none
    }
    CommentComponent.prototype.updateVotings = function () {
        var _this = this;
        return this.auth.loadUser().then(function (user) { return _this.user = user; }).then(function () { return _this.voting.loadVotings(_this.comment.id).then(function (votings) {
            _this.votings = votings;
            return _this.voting.loadVote(_this.comment.id);
        }).then(function (vote) {
            _this.currentVote = vote;
        }); });
    };
    CommentComponent.prototype.ngOnChanges = function (changes) {
        this.updateVotings();
    };
    CommentComponent.prototype.like = function () {
        var _this = this;
        if (this.currentVote === 'like') {
            return this.voting.unvote(this.comment.id).then(function () { return _this.updateVotings(); }, function (err) { return console.log(err); });
        }
        else {
            return this.voting.like(this.comment.id)
                .then(function () { return _this.updateVotings(); }, function (err) { return console.log(err); });
        }
    };
    CommentComponent.prototype.dislike = function () {
        var _this = this;
        if (this.currentVote === 'dislike') {
            return this.voting.unvote(this.comment.id).then(function () { return _this.updateVotings(); }, function (err) { return console.log(err); });
        }
        else {
            return this.voting.dislike(this.comment.id)
                .then(function () { return _this.updateVotings(); }, function (err) { return console.log(err); });
        }
    };
    CommentComponent.prototype.unwanted = function () {
        var _this = this;
        if (this.currentVote === 'unwanted') {
            return this.voting.unvote(this.comment.id).then(function () { return _this.updateVotings(); }, function (err) { return console.log(err); });
        }
        else {
            return this.voting.unwanted(this.comment.id)
                .then(function () { return _this.updateVotings(); }, function (err) { return console.log(err); });
        }
    };
    return CommentComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", comment_1.Comment)
], CommentComponent.prototype, "comment", void 0);
CommentComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'tr-simple-comment',
        templateUrl: 'comment.component.html',
        styleUrls: []
    }),
    __metadata("design:paramtypes", [comment_voting_service_1.CommentVotingService,
        auth_service_1.AuthService])
], CommentComponent);
exports.CommentComponent = CommentComponent;
//# sourceMappingURL=comment.component.js.map