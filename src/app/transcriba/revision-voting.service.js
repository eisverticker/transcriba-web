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
var RevisionVotingService = (function () {
    function RevisionVotingService(voting) {
        this.voting = voting;
    }
    RevisionVotingService.prototype.accept = function (id) {
        var votingContext = new voting_context_1.VotingContext('Revision', id);
        return this.voting.vote(votingContext, 'accept');
    };
    RevisionVotingService.prototype.refuse = function (id) {
        var votingContext = new voting_context_1.VotingContext('Revision', id);
        return this.voting.vote(votingContext, 'refuse');
    };
    RevisionVotingService.prototype.unvote = function (id) {
        var votingContext = new voting_context_1.VotingContext('Revision', id);
        return this.voting.unvote(votingContext);
    };
    RevisionVotingService.prototype.loadVotings = function (id) {
        var _this = this;
        var votingContext = new voting_context_1.VotingContext('Revision', id);
        var res = {
            accept: [],
            refuse: []
        };
        return this.voting.loadUsers(votingContext, 'accept')
            .then(function (users) {
            res.accept = users;
            return _this.voting.loadUsers(votingContext, 'refuse');
        }).then(function (users) {
            res.refuse = users;
            return res;
        });
    };
    RevisionVotingService.prototype.loadVote = function (id) {
        var votingContext = new voting_context_1.VotingContext('Revision', id);
        return this.voting.loadVote(votingContext);
    };
    return RevisionVotingService;
}());
RevisionVotingService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [voting_service_1.VotingService])
], RevisionVotingService);
exports.RevisionVotingService = RevisionVotingService;
//# sourceMappingURL=revision-voting.service.js.map