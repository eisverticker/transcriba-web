"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
// components
// ..
// modules
var platform_browser_1 = require("@angular/platform-browser");
var utility_module_1 = require("../utilities/utility.module");
var auth_module_1 = require("../loopback-auth/auth.module");
var http_1 = require("@angular/http");
// services
var voting_service_1 = require("./voting.service");
// routing
// ..
var VotingModule = (function () {
    function VotingModule() {
    }
    return VotingModule;
}());
VotingModule = __decorate([
    core_1.NgModule({
        declarations: [],
        imports: [
            platform_browser_1.BrowserModule,
            http_1.HttpModule,
            utility_module_1.UtilityModule,
            auth_module_1.AuthModule
        ],
        exports: [],
        bootstrap: [],
        providers: [
            voting_service_1.VotingService
        ]
    })
], VotingModule);
exports.VotingModule = VotingModule;
//# sourceMappingURL=voting.module.js.map