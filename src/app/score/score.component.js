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
var score_service_1 = require("./score.service");
var auth_service_1 = require("../loopback-auth/auth.service");
var notification_service_1 = require("../utilities/notification.service");
var notification_1 = require("../utilities/notification");
var Rx_1 = require("rxjs/Rx");
var ScoreComponent = (function () {
    function ScoreComponent(scoreService, notifier, auth) {
        this.scoreService = scoreService;
        this.notifier = notifier;
        this.auth = auth;
    }
    ScoreComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.loadScore();
        var scoreWatcher = Rx_1.Observable.interval(10000) // ms
            .timeInterval()
            .subscribe(function () { return _this.loadScore(); }, function (err) { return console.log(err); });
        this.auth.user.subscribe(function (user) {
            _this.score = undefined;
        });
    };
    ScoreComponent.prototype.loadScore = function () {
        var _this = this;
        if (!this.auth.token) {
            return;
        }
        ;
        this.scoreService.loadScore().then(function (score) {
            if (_this.score === undefined) {
                _this.score = score;
            }
            else if (_this.score < score) {
                _this.notifier.notify(new notification_1.Notification('+ ' + (score - _this.score), ['success', 'untranslated']));
                _this.score = score;
            }
            else if (_this.score > score) {
                _this.notifier.notify(new notification_1.Notification('- ' + (score - _this.score), ['fail', 'untranslated']));
                _this.score = score;
            }
        }, function (err) {
            console.log('we were not able to load score', err);
        });
    };
    return ScoreComponent;
}());
ScoreComponent = __decorate([
    core_1.Component({
        selector: 'tr-score-value',
        template: '<span *ngIf="score != undefined">{{ score }}</span>'
    }),
    __metadata("design:paramtypes", [score_service_1.ScoreService,
        notification_service_1.NotificationService,
        auth_service_1.AuthService])
], ScoreComponent);
exports.ScoreComponent = ScoreComponent;
//# sourceMappingURL=score.component.js.map