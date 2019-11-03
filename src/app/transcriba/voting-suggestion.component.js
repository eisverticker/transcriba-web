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
var backend_helper_1 = require("../utilities/backend-helper");
var transcriba_service_1 = require("./transcriba.service");
var VotingSuggestionComponent = (function () {
    function VotingSuggestionComponent(transcriba, backend) {
        this.transcriba = transcriba;
        this.backend = backend;
        this.page = 0;
    }
    VotingSuggestionComponent.prototype.ngOnInit = function () {
        this.updateObjects();
    };
    VotingSuggestionComponent.prototype.nextPage = function () {
        this.page++;
        this.updateObjects();
    };
    VotingSuggestionComponent.prototype.previousPage = function () {
        this.page--;
        this.updateObjects();
    };
    VotingSuggestionComponent.prototype.updateObjects = function () {
        var _this = this;
        this.transcriba.loadObjectPage(this.page, 3, undefined, undefined, 'voting').then(function (objects) { return _this.objects = objects; }, function (err) { return console.log(err); });
    };
    return VotingSuggestionComponent;
}());
VotingSuggestionComponent = __decorate([
    core_1.Component({
        selector: 'tr-voting-suggestions',
        template: "\n    <div *ngIf=\"objects && !(page == 0 && objects.length == 0)\" class=\"panel panel-default\">\n      <div class=\"panel-heading\">\n        <span>An Abstimmungen teilnehmen</span>\n        <button *ngIf=\"objects.length == 3\" class=\"btn btn-default\" (click)=\"nextPage()\">Umbl\u00E4ttern</button>\n        <button *ngIf=\"page !== 0\" class=\"btn btn-default\" (click)=\"previousPage()\">Zur\u00FCck</button>\n      </div>\n      <div class=\"panel-body\">\n        <div *ngIf=\"!objects || objects.length == 0\">\n          Keine Objekte vorhanden\n        </div>\n        <div class=\"col-md-4\" *ngFor=\"let object of objects\">\n          <a class=\"thumbnail\" [routerLink]=\"'/obj/'+object.id+'/transcribe'\" class=\"btn btn-default\">\n            <img [src]=\"backend.unAuthUrl('TranscribaObjects/'+object.id+'/thumbnail')\" alt=\"thumbnail\">\n          </a>\n          <div class=\"caption\">\n            <p>{{ object.title }}</p>\n          </div>\n        </div>\n      </div>\n    </div>\n  "
    }),
    __metadata("design:paramtypes", [transcriba_service_1.TranscribaService,
        backend_helper_1.BackendHelper])
], VotingSuggestionComponent);
exports.VotingSuggestionComponent = VotingSuggestionComponent;
//# sourceMappingURL=voting-suggestion.component.js.map