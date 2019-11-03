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
var router_1 = require("@angular/router");
var transcriba_service_1 = require("./transcriba.service");
var transcription_service_1 = require("./transcription.service");
var revision_voting_service_1 = require("./revision-voting.service");
var notification_service_1 = require("../utilities/notification.service");
var notification_1 = require("../utilities/notification");
var auth_service_1 = require("../loopback-auth/auth.service");
var TranscriptionViewerComponent = (function () {
    function TranscriptionViewerComponent(transcriba, transcription, voting, router, notify, auth) {
        this.transcriba = transcriba;
        this.transcription = transcription;
        this.voting = voting;
        this.router = router;
        this.notify = notify;
        this.auth = auth;
        this.editable = true;
        this.labels = [];
        this.markDirty = [false, true];
    }
    TranscriptionViewerComponent.prototype.ngOnChanges = function (changes) {
        var _this = this;
        this.auth.loadUser().then(function (user) {
            _this.user = user;
            _this.update();
        }, function (err) { return console.log(err); });
    };
    TranscriptionViewerComponent.prototype.transcribe = function () {
        var _this = this;
        this.transcription.start(this.object.id).then(function (newRevision) {
            _this.update();
        }, function () { return _this.notify.notify(new notification_1.Notification('request.fail', ['error'])); });
    };
    TranscriptionViewerComponent.prototype.voteInFavor = function () {
        var _this = this;
        this.voting.accept(this.latestRevision.id).then(function () {
            _this.notify.notify(new notification_1.Notification('request.success', ['success']));
            _this.update();
        }, function (err) { return console.log(err); });
    };
    TranscriptionViewerComponent.prototype.voteAgainst = function () {
        var _this = this;
        this.voting.refuse(this.latestRevision.id).then(function () {
            _this.notify.notify(new notification_1.Notification('request.success', ['success']));
            _this.update();
        }, function (err) { return console.log(err); });
    };
    TranscriptionViewerComponent.prototype.save = function (content) {
        var _this = this;
        console.log('save', content);
        this.transcription.save(this.object.id, content).then(function () { return _this.notify.notify(new notification_1.Notification('request.success', ['success'])); }, function () { return _this.notify.notify(new notification_1.Notification('request.fail', ['fail'])); });
    };
    TranscriptionViewerComponent.prototype.publish = function (content) {
        var _this = this;
        this.transcription.publish(this.object.id, content).then(function () {
            _this.notify.notify(new notification_1.Notification('request.success', ['success']));
            // navigate to overview, because of bug #3
            //  https://github.com/eisverticker/transcriba/issues/3
            _this.router.navigate(['/obj', _this.object.id]);
            // this.update();
        }, function () { return _this.notify.notify(new notification_1.Notification('request.fail', ['fail'])); });
    };
    TranscriptionViewerComponent.prototype.abort = function () {
        var _this = this;
        console.log('abort');
        this.transcription.abort().then(function () { return _this.update(); }, function (err) { return console.log(err); });
    };
    TranscriptionViewerComponent.prototype.update = function () {
        var _this = this;
        this.labels = [];
        this.transcriba.loadByID(this.objectId).then(function (obj) { return _this.setObject(obj); }, function (err) { return console.log('error loading object', err); });
    };
    TranscriptionViewerComponent.prototype.setObject = function (obj) {
        var _this = this;
        this.object = obj;
        // we are preloading a revision based on the status
        //  of the transcriba object
        //  we are loading the stable revision normally
        //  but if the object is occupied then we
        //  need the latest revision to check whether the current user
        //  is the owner
        if (this.object.status === 'occupied') {
            this.transcriba.loadLatestRevision(this.object.id).then(function (latestRevision) {
                if (latestRevision.ownerId === _this.auth.userID) {
                    _this.editable = true;
                    _this.contents = [latestRevision.content];
                }
                else {
                    _this.editable = false;
                    _this.contents = [latestRevision.content];
                }
            }, function (err) { return console.log('can\'t load revision data', err); });
        }
        else {
            this.transcriba.loadStableRevision(this.object.id).then(function (stableRevision) {
                if (_this.object.status === 'voting') {
                    // get latest revision and check whether the user has already voted
                    _this.transcriba.loadLatestRevision(_this.object.id).then(function (latestRevision) {
                        _this.voting.loadVote(latestRevision).then(function (vote) {
                            _this.transcriba.loadLatestRevisionPermissions(_this.object.id).then(function (permissions) {
                                _this.permissions = permissions;
                                console.log(permissions);
                                _this.hasVoted = vote !== 'none';
                                _this.contents = [stableRevision.content, latestRevision.content];
                                _this.labels = ['Alt', 'Neu'];
                                _this.editable = false;
                                _this.latestRevision = latestRevision;
                            }, function (err) { return console.log(err); });
                        }, function (err) { return console.log('couldn\'t load vote', err); });
                        _this.voting.loadVotings(latestRevision.id).then(function (votings) { return _this.votings = votings; }, function (err) { return console.log(err); });
                    }, function (err) { return console.log('can\'t load revision data', err); });
                }
                else if (_this.object.status === 'free') {
                    _this.contents = [stableRevision.content];
                    _this.editable = false;
                }
            }, function (err) { return console.log('can\'t load revision data', err); });
        }
    };
    return TranscriptionViewerComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], TranscriptionViewerComponent.prototype, "objectId", void 0);
TranscriptionViewerComponent = __decorate([
    core_1.Component({
        selector: 'tr-transcription-viewer',
        template: "\n  <div *ngIf=\"object\">\n    <div class=\"editor-navigation hidden-xs\">\n      <div *ngIf=\"latestRevision && object.status == 'voting' && user.isRegistered() && (hasVoted != undefined && !hasVoted)\">\n        <div *ngIf=\"user.id != latestRevision.ownerId\" class=\"alert alert-info\">\n          <strong>Achtung!</strong> F\u00FCr dieses Objekt ist eine neue Version verf\u00FCgbar, bitte \u00FCberpr\u00FCfe diese und stimme ab!\n        </div>\n        <div *ngIf=\"!permissions.details.eligibleVoter && !permissions.details.isOwner\" class=\"alert alert-warning\">\n          <strong>Entschuldigung!</strong>\n          Als Anf\u00E4nger darfst du hier noch nicht abstimmen.\n          Sammle erst Erfahrung indem du Schriften transkribierst.\n        </div>\n        <div *ngIf=\"permissions.details.maximumVotesReached\" class=\"alert alert-warning\">\n          <strong>Achtung!</strong>\n          Du hast die maximale Anzahl an Abstimmungen f\u00FCr heute erreicht.\n          Du kannst aber zu einem sp\u00E4teren Zeitpunkt gerne weitermachen.\n        </div>\n        <div *ngIf=\"permissions.details.isOwner\" class=\"alert alert-info\">\n          <strong>Danke f\u00FCr deine M\u00FChe!</strong> Deine Arbeit wird nun von der Community \u00FCberpr\u00FCft.\n        </div>\n        <span>Neue Version: </span>\n        <button\n          [disabled]=\"!permissions.allowVote\"\n          (click)=\"voteInFavor()\"\n          class=\"btn btn-success\">\n          Akzeptieren\n          <span *ngIf=\"votings\" class=\"badge\">\n          {{ votings.accept.length }}\n          </span>\n        </button>\n        <button\n          [disabled]=\"!permissions.allowVote\"\n          (click)=\"voteAgainst()\"\n          class=\"btn btn-danger\">\n          Ablehnen\n          <span *ngIf=\"votings\" class=\"badge\">{{ votings.refuse.length }}\n          </span>\n        </button>\n      </div>\n    </div>\n    <tr-tei-editor\n      (save)=\"save($event)\"\n      (publish)=\"publish($event)\"\n      (abort)=\"abort()\"\n      (start)=\"transcribe()\"\n      [enableStarter]=\"object.status == 'free' && user.isRegistered()\"\n      [editable]=\"editable\"\n      [contents]=\"contents\"\n      [objectId]=\"object.id\"\n      [markDirty]=\"markDirty\"\n      [labels]=\"labels\">\n    </tr-tei-editor>\n  </div>\n  "
    }),
    __metadata("design:paramtypes", [transcriba_service_1.TranscribaService,
        transcription_service_1.TranscriptionService,
        revision_voting_service_1.RevisionVotingService,
        router_1.Router,
        notification_service_1.NotificationService,
        auth_service_1.AuthService])
], TranscriptionViewerComponent);
exports.TranscriptionViewerComponent = TranscriptionViewerComponent;
//# sourceMappingURL=transcription-viewer.component.js.map