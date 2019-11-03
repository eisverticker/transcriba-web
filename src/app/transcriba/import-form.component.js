"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var form_request_handling_1 = require("../utilities/form-request-handling");
var transcriba_service_1 = require("./transcriba.service");
var source_service_1 = require("../source/source.service");
var notification_1 = require("../utilities/notification");
var notification_service_1 = require("../utilities/notification.service");
var ImportFormComponent = (function (_super) {
    __extends(ImportFormComponent, _super);
    function ImportFormComponent(transcriba, sourceService, notifier) {
        var _this = _super.call(this) || this;
        _this.transcriba = transcriba;
        _this.sourceService = sourceService;
        _this.notifier = notifier;
        return _this;
    }
    ImportFormComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.sourceService.loadAllSources().then(function (sources) {
            _this.sources = sources.filter(function (source) { return source.activated; });
            // default selection (first element)
            if (_this.sources.length > 0) {
                _this.selectedSourceID = _this.sources[0].id;
            }
        }, function (err) { return console.log(err); });
    };
    ImportFormComponent.prototype.import = function () {
        var _this = this;
        var selectedSource = this.getSourceById(this.selectedSourceID);
        var request = this.transcriba.import(selectedSource, this.foreignID);
        this.watchRequestState(request);
        request.then(function () { return _this.notifier.notify(new notification_1.Notification('request.success', ['success'])); }, function (err) { return console.log('import error', err); });
    };
    ImportFormComponent.prototype.getSourceById = function (id) {
        for (var i = 0; i < this.sources.length; i++) {
            if (this.sources[i].id === id) {
                return this.sources[i];
            }
        }
        throw 'source id not found';
    };
    return ImportFormComponent;
}(form_request_handling_1.FormRequestHandling));
ImportFormComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'tr-transcriba-import',
        templateUrl: 'import-form.component.html',
        styleUrls: []
    }),
    __metadata("design:paramtypes", [transcriba_service_1.TranscribaService,
        source_service_1.SourceService,
        notification_service_1.NotificationService])
], ImportFormComponent);
exports.ImportFormComponent = ImportFormComponent;
//# sourceMappingURL=import-form.component.js.map