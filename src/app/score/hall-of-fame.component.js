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
var HallOfFameComponent = (function () {
    function HallOfFameComponent(scoreService) {
        this.scoreService = scoreService;
    }
    HallOfFameComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.scoreService.loadBestScorers().then(function (scorers) { return _this.scorers = scorers; }, function (err) { return console.log('we were not able to load hall of fame', err); });
    };
    return HallOfFameComponent;
}());
HallOfFameComponent = __decorate([
    core_1.Component({
        selector: 'tr-hall-of-fame',
        template: "\n  <div class=\"panel panel-default\">\n    <div class=\"panel-heading\">\n      Die besten Mitwirkenden auf Transcriba\n    </div>\n    <div class=\"panel-body\">\n      <ul class=\"list-group\">\n        <li *ngFor=\"let scorer of scorers\" class=\"list-group-item\">\n          <span class=\"badge\">\n          <i class=\"fa fa-trophy fa-lg\" aria-hidden=\"true\"></i>\n          {{ scorer.score }}\n          </span>\n          {{ scorer.username }}\n        </li>\n      </ul>\n    </div>\n  </div>\n  "
    }),
    __metadata("design:paramtypes", [score_service_1.ScoreService])
], HallOfFameComponent);
exports.HallOfFameComponent = HallOfFameComponent;
//# sourceMappingURL=hall-of-fame.component.js.map