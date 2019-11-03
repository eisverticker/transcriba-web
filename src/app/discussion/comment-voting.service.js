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
var voting_service_1 = require("../voting/voting.service");
var voting_context_1 = require("../voting/voting-context");
var core_1 = require("@angular/core");
var CommentVotingService = (function () {
    function CommentVotingService(voting) {
        this.voting = voting;
    }
    CommentVotingService.prototype.like = function (id) {
        var votingContext = new voting_context_1.VotingContext('Comment', id);
        return this.voting.vote(votingContext, 'like');
    };
    CommentVotingService.prototype.dislike = function (id) {
        var votingContext = new voting_context_1.VotingContext('Comment', id);
        return this.voting.vote(votingContext, 'dislike');
    };
    CommentVotingService.prototype.unwanted = function (id) {
        var votingContext = new voting_context_1.VotingContext('Comment', id);
        return this.voting.vote(votingContext, 'unwanted');
    };
    CommentVotingService.prototype.unvote = function (id) {
        var votingContext = new voting_context_1.VotingContext('Comment', id);
        return this.voting.unvote(votingContext);
    };
    CommentVotingService.prototype.loadVotings = function (id) {
        var _this = this;
        var votingContext = new voting_context_1.VotingContext('Comment', id);
        var res = {
            likes: [],
            dislikes: [],
            unwanted: []
        };
        return this.voting.loadUsers(votingContext, 'like')
            .then(function (users) {
            res.likes = users;
            return _this.voting.loadUsers(votingContext, 'dislike');
        }).then(function (users) {
            res.dislikes = users;
            return _this.voting.loadUsers(votingContext, 'unwanted');
        }).then(function (users) {
            res.unwanted = users;
            return res;
        });
    };
    CommentVotingService.prototype.loadVote = function (id) {
        var votingContext = new voting_context_1.VotingContext('Comment', id);
        return this.voting.loadVote(votingContext);
    };
    return CommentVotingService;
}());
CommentVotingService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [voting_service_1.VotingService])
], CommentVotingService);
exports.CommentVotingService = CommentVotingService;
//# sourceMappingURL=comment-voting.service.js.map