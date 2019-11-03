"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var router_1 = require("@angular/router");
// general components
var dashboard_component_1 = require("./dashboard.component");
// error handling components
var page_not_found_component_1 = require("./page-not-found.component");
var authorization_required_component_1 = require("./authorization-required.component");
var routes = [
    {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full'
    },
    {
        path: 'home',
        component: dashboard_component_1.DashboardComponent
    },
    {
        path: '403',
        component: authorization_required_component_1.AuthorizationRequiredComponent
    },
    {
        path: '404',
        component: page_not_found_component_1.PageNotFoundComponent
    },
    {
        path: '**',
        component: page_not_found_component_1.PageNotFoundComponent
    }
];
exports.appRoutingProviders = [];
exports.routing = router_1.RouterModule.forRoot(routes);
//# sourceMappingURL=app.routing.js.map