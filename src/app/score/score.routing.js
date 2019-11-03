"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var router_1 = require("@angular/router");
var hall_of_fame_component_1 = require("./hall-of-fame.component");
// import { AuthGuardService } from './auth-guard.service';
var routes = [
    {
        path: 'highscore',
        component: hall_of_fame_component_1.HallOfFameComponent,
    }
];
exports.scoreRouting = router_1.RouterModule.forChild(routes);
//# sourceMappingURL=score.routing.js.map