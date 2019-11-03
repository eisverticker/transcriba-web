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
var notification_service_1 = require("../utilities/notification.service");
var backend_helper_1 = require("../utilities/backend-helper");
var router_1 = require("@angular/router");
var ExplorerComponent = (function () {
    function ExplorerComponent(transcriba, notify, route, router, backend) {
        this.transcriba = transcriba;
        this.notify = notify;
        this.route = route;
        this.router = router;
        this.backend = backend;
        this.collections = [];
        this.objects = [[]];
        this.isLoading = true;
        this.activeSearchTerm = '';
        this.searchTerm = '';
        this.currentPage = 0;
        this.numOfItems = 0;
        this.numOfPages = 1;
        this.itemsPerPage = 12;
        this.mode = 'object'; // object, collection?
    }
    ExplorerComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.initNavigation();
        this.route.data.subscribe(function (data) {
            _this.route.params.subscribe(function (params) {
                _this.mode = data['mode'];
                if (_this.mode === 'insideCollection') {
                    _this.collectionId = params['id'];
                }
                _this.updateData();
            });
        });
    };
    ExplorerComponent.prototype.setPage = function (page) {
        this.currentPage = page;
        this.updateData();
    };
    ExplorerComponent.prototype.find = function () {
        if (this.searchTerm !== this.activeSearchTerm) {
            this.currentPage = 0;
            this.activeSearchTerm = this.searchTerm;
            this.updateData();
        }
    };
    ExplorerComponent.prototype.setNumberOfPages = function () {
        this.numOfPages = Math.ceil(this.numOfItems / this.itemsPerPage);
    };
    ExplorerComponent.prototype.columnify = function (last, current) {
        var group = last.length - 1;
        if (last[group].length === 3) {
            last.push([]);
            group++;
        }
        last[group].push(current);
        return last;
    };
    ExplorerComponent.prototype.updateData = function () {
        var _this = this;
        this.isLoading = true;
        var searchValue;
        if (this.searchTerm.length < 2) {
            searchValue = undefined;
        }
        else {
            searchValue = this.searchTerm;
        }
        // Create usable columnified (multi array) data from collection and transcribaObject objects
        if (this.mode === 'collection') {
            return this.transcriba.loadCollectionPage(this.currentPage, this.itemsPerPage * 2).then(function (collections) {
                _this.collections = collections;
                _this.isLoading = false;
            }, function (err) {
                console.log(err);
                _this.isLoading = false;
            });
        }
        else if (this.mode === 'object') {
            return this.transcriba.loadObjectCount(searchValue).then(function (count) {
                _this.numOfItems = count;
                _this.setNumberOfPages();
                return _this.transcriba
                    .loadObjectPage(_this.currentPage, _this.itemsPerPage, searchValue)
                    .then(function (objects) {
                    _this.objects = objects.reduce(_this.columnify, [[]]);
                    console.log(_this.objects);
                    _this.isLoading = false;
                }, function (err) {
                    console.log(err);
                    _this.isLoading = false;
                });
            }, function (err) { return console.log(err); });
        }
        else if (this.mode === 'insideCollection') {
            return this.transcriba
                .loadObjectPageFromCollection(this.currentPage, this.itemsPerPage, this.collectionId)
                .then(function (objects) {
                _this.objects = objects.reduce(_this.columnify, [[]]);
                _this.isLoading = false;
            }, function (err) {
                console.log(err);
                _this.isLoading = false;
            });
        }
    };
    ExplorerComponent.prototype.initNavigation = function () {
        this.navItems = [
            /*{
              name: "general.collections",
              route: '/explore'
            },*/
            {
                name: 'general.objects',
                route: '/explore'
            }
        ];
    };
    return ExplorerComponent;
}());
ExplorerComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'tr-transcriba-explorer',
        templateUrl: 'explorer.component.html',
        styleUrls: []
    }),
    __metadata("design:paramtypes", [transcriba_service_1.TranscribaService,
        notification_service_1.NotificationService,
        router_1.ActivatedRoute,
        router_1.Router,
        backend_helper_1.BackendHelper])
], ExplorerComponent);
exports.ExplorerComponent = ExplorerComponent;
//# sourceMappingURL=explorer.component.js.map