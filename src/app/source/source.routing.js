"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var router_1 = require("@angular/router");
var admin_guard_service_1 = require("../loopback-auth/admin-guard.service");
var source_component_1 = require("./source.component");
var source_details_component_1 = require("./source-details.component");
var routes = [
    {
        path: 'sources/:id',
        component: source_details_component_1.SourceDetailsComponent,
        canActivate: [admin_guard_service_1.AdminGuardService]
    },
    {
        path: 'sources',
        component: source_component_1.SourceComponent,
        canActivate: [admin_guard_service_1.AdminGuardService]
    }
];
exports.sourceRouting = router_1.RouterModule.forChild(routes);
//# sourceMappingURL=source.routing.js.map