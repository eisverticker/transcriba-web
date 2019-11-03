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
var score_component_1 = require("./score.component");
var hall_of_fame_component_1 = require("./hall-of-fame.component");
// pipes
// modules
var platform_browser_1 = require("@angular/platform-browser");
var forms_1 = require("@angular/forms");
var auth_module_1 = require("../loopback-auth/auth.module");
// services
var score_service_1 = require("./score.service");
// routing
var score_routing_1 = require("./score.routing");
var ScoreModule = (function () {
    function ScoreModule() {
    }
    return ScoreModule;
}());
ScoreModule = __decorate([
    core_1.NgModule({
        declarations: [
            score_component_1.ScoreComponent,
            hall_of_fame_component_1.HallOfFameComponent
        ],
        imports: [
            platform_browser_1.BrowserModule,
            forms_1.FormsModule,
            auth_module_1.AuthModule,
            score_routing_1.scoreRouting
        ],
        exports: [score_component_1.ScoreComponent, hall_of_fame_component_1.HallOfFameComponent],
        bootstrap: [],
        providers: [
            score_service_1.ScoreService
        ]
    })
], ScoreModule);
exports.ScoreModule = ScoreModule;
//# sourceMappingURL=score.module.js.map