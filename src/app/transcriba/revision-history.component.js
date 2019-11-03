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
var transcriba_service_1 = require("./transcriba.service");
var RevisionHistoryComponent = (function () {
    function RevisionHistoryComponent(transcriba) {
        this.transcriba = transcriba;
    }
    RevisionHistoryComponent.prototype.ngOnChanges = function (changes) {
        var _this = this;
        this.transcriba.loadChronic(this.objectId).then(function (chronic) {
            _this.items = chronic;
        }, function (err) { return console.log('failed to load chronic', err); });
    };
    return RevisionHistoryComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], RevisionHistoryComponent.prototype, "objectId", void 0);
RevisionHistoryComponent = __decorate([
    core_1.Component({
        selector: 'tr-revision-history',
        template: "\n  <ut-inline-spinner [active]=\"items == undefined\"></ut-inline-spinner>\n  <table class=\"table\" *ngIf=\"items\">\n    <tr>\n      <th>Nutzer</th>\n      <th>Datum</th>\n      <th>Abgeschlossen</th>\n      <th>Genehmigt</th>\n    </tr>\n    <tr *ngFor=\"let item of items\">\n      <td>{{ item.username }}</td>\n      <td>{{ item.createdAt }}</td>\n      <td><i class=\"fa fa-check\" *ngIf=\"item.published\" aria-hidden=\"true\"></i></td>\n      <td><i class=\"fa fa-check\" *ngIf=\"item.approved\" aria-hidden=\"true\"></i></td>\n    </tr>\n  "
    }),
    __metadata("design:paramtypes", [transcriba_service_1.TranscribaService])
], RevisionHistoryComponent);
exports.RevisionHistoryComponent = RevisionHistoryComponent;
//# sourceMappingURL=revision-history.component.js.map