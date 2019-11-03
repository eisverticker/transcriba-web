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
var configuration_service_1 = require("../config/configuration.service");
var BackendHelper = (function () {
    function BackendHelper(config) {
        this.config = config;
    }
    BackendHelper.prototype.authUrl = function (ressourceUri, token, filter) {
        if (filter === undefined) {
            filter = '';
        }
        else {
            filter = '&' + filter;
        }
        return this.config.get('backendApiUrl', 'http://localhost:3001/api/') + ressourceUri + '?access_token=' + token + filter;
    };
    BackendHelper.prototype.unAuthUrl = function (ressourceUri, filter) {
        if (filter === undefined) {
            filter = '';
        }
        else {
            filter = '?' + filter;
        }
        return this.config.get('backendApiUrl', 'http://localhost:3001/api/') + ressourceUri + filter;
    };
    return BackendHelper;
}());
BackendHelper = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [configuration_service_1.ConfigurationService])
], BackendHelper);
exports.BackendHelper = BackendHelper;
//# sourceMappingURL=backend-helper.js.map