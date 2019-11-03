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
var transcriba_object_1 = require("./transcriba-object");
var transcriba_service_1 = require("./transcriba.service");
var discussion_service_1 = require("../discussion/discussion.service");
var source_service_1 = require("../source/source.service");
var backend_helper_1 = require("../utilities/backend-helper");
var OverviewComponent = (function () {
    function OverviewComponent(transcriba, backend, sourceService, discussionService) {
        this.transcriba = transcriba;
        this.backend = backend;
        this.sourceService = sourceService;
        this.discussionService = discussionService;
    }
    OverviewComponent.prototype.ngOnChanges = function (changes) {
        var _this = this;
        this.discussionService.loadByID(this.object.discussionID).then(function (discussion) { return _this.discussion = discussion; }, function (err) { return console.log(err); });
        this.sourceService.loadSummaryByID(this.object.sourceID).then(function (source) { return _this.source = source; }, function (err) { return console.log('error', err); });
    };
    return OverviewComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", transcriba_object_1.TranscribaObject)
], OverviewComponent.prototype, "object", void 0);
OverviewComponent = __decorate([
    core_1.Component({
        selector: 'tr-object-overview',
        template: "\n  <h2>{{ object.title }}</h2>\n  <div class=\"row\">\n    <div>\n      <a [routerLink]=\"'/obj/'+object.id+'/viewer'\">\n        <img\n        style=\"height: 512px;\"\n        class=\"img-responsive\"\n        [src]=\"backend.unAuthUrl('TranscribaObjects/'+object.id+'/overview')\"\n        alt=\"thumbnail\"\n        />\n      </a>\n    </div>\n  </div>\n  <h3>Infos</h3>\n  <dl *ngIf=\"source\">\n    <dt>Quelle</dt>\n    <dd>{{ source.title }} ({{ object.externalID }})</dd>\n  </dl>\n\n  <h3>Zuletzt geschriebene Kommentare</h3>\n  <tr-latest-comments *ngIf=\"discussion\" [numOfItems]=\"3\" [discussionId]=\"discussion.id\"></tr-latest-comments>\n  "
    }),
    __metadata("design:paramtypes", [transcriba_service_1.TranscribaService,
        backend_helper_1.BackendHelper,
        source_service_1.SourceService,
        discussion_service_1.DiscussionService])
], OverviewComponent);
exports.OverviewComponent = OverviewComponent;
//# sourceMappingURL=overview.component.js.map