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
var auth_service_1 = require("../loopback-auth/auth.service");
var backend_helper_1 = require("../utilities/backend-helper");
var transcriba_service_1 = require("./transcriba.service");
var BusyWidgetComponent = (function () {
    function BusyWidgetComponent(auth, transcriba, backend) {
        this.auth = auth;
        this.transcriba = transcriba;
        this.backend = backend;
    }
    BusyWidgetComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.auth.loadUser().then(// load user to check if the user is registered
        function (// load user to check if the user is registered
            user) {
            if (user.isRegistered()) {
                _this.transcriba.isUserBusy().then(// check busy state
                function (// check busy state
                    isBusy) {
                    if (isBusy) {
                        _this.transcriba.loadCurrentlyOccupiedObject().then(// load object if busy
                        function (// load object if busy
                            object) { return _this.object = object; }, function (err) { return console.log(err); });
                    }
                }, function (err) { return console.log(err); });
            }
        }, function (err) { return console.log(err); });
    };
    return BusyWidgetComponent;
}());
BusyWidgetComponent = __decorate([
    core_1.Component({
        selector: 'tr-busy-widget',
        template: "\n    <div *ngIf=\"object\" class=\"panel panel-primary\">\n      <div class=\"panel-heading\">\n        <span>Daran arbeitest du aktuell</span>\n      </div>\n      <div class=\"panel-body\">\n        <a class=\"thumbnail\" [routerLink]=\"'/obj/'+object.id+'/transcribe'\" class=\"btn btn-default\">\n          <img [src]=\"backend.unAuthUrl('TranscribaObjects/'+object.id+'/thumbnail')\" alt=\"thumbnail\">\n        </a>\n        <div class=\"caption\">\n          <p>{{ object.title }}</p>\n        </div>\n      </div>\n    </div>\n  "
    }),
    __metadata("design:paramtypes", [auth_service_1.AuthService,
        transcriba_service_1.TranscribaService,
        backend_helper_1.BackendHelper])
], BusyWidgetComponent);
exports.BusyWidgetComponent = BusyWidgetComponent;
//# sourceMappingURL=busy-widget.component.js.map