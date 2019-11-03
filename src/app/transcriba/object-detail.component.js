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
var transcription_service_1 = require("./transcription.service");
var revision_voting_service_1 = require("./revision-voting.service");
var notification_service_1 = require("../utilities/notification.service");
var router_1 = require("@angular/router");
var auth_service_1 = require("../loopback-auth/auth.service");
var discussion_service_1 = require("../discussion/discussion.service");
var source_service_1 = require("../source/source.service");
var backend_helper_1 = require("../utilities/backend-helper");
var Rx_1 = require("rxjs/Rx");
var ObjectDetailComponent = (function () {
    function ObjectDetailComponent(transcriba, transcription, notify, route, router, discussionService, auth, backend, sourceService, voting) {
        this.transcriba = transcriba;
        this.transcription = transcription;
        this.notify = notify;
        this.route = route;
        this.router = router;
        this.discussionService = discussionService;
        this.auth = auth;
        this.backend = backend;
        this.sourceService = sourceService;
        this.voting = voting;
        this.navItems = [];
    }
    ObjectDetailComponent.prototype.ngOnInit = function () {
        var _this = this;
        Rx_1.Observable.zip(this.route.params, this.route.data, function (params, data) {
            return {
                'params': params,
                'data': data
            };
        }).subscribe(function (d) {
            var id = d.params['id'];
            // load object
            _this.transcriba.loadByID(id).then(function (obj) {
                _this.mode = d.data['mode'];
                _this.initNavigation(obj);
                _this.object = obj;
            }, function (err) { return console.log('cannot load object', err); });
        });
    };
    ObjectDetailComponent.prototype.initNavigation = function (obj) {
        this.navItems = [
            {
                name: 'general.overview',
                route: '/obj/' + obj.id
            },
            {
                name: 'general.transcription',
                route: '/obj/' + obj.id + '/transcribe'
            },
            {
                name: 'general.discussion',
                route: '/obj/' + obj.id + '/discussion'
            },
            {
                name: 'general.viewer',
                route: '/obj/' + obj.id + '/viewer'
            },
            {
                name: 'general.versionHistory',
                route: '/obj/' + obj.id + '/chronic'
            } /*,
            {
              name: "general.metadata",
              route: '/obj/'+obj.id+'/meta'
            }*/
        ];
    };
    return ObjectDetailComponent;
}());
ObjectDetailComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'tr-object-detail',
        templateUrl: 'object-detail.component.html',
        styleUrls: []
    }),
    __metadata("design:paramtypes", [transcriba_service_1.TranscribaService,
        transcription_service_1.TranscriptionService,
        notification_service_1.NotificationService,
        router_1.ActivatedRoute,
        router_1.Router,
        discussion_service_1.DiscussionService,
        auth_service_1.AuthService,
        backend_helper_1.BackendHelper,
        source_service_1.SourceService,
        revision_voting_service_1.RevisionVotingService])
], ObjectDetailComponent);
exports.ObjectDetailComponent = ObjectDetailComponent;
//# sourceMappingURL=object-detail.component.js.map