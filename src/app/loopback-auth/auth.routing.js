"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var router_1 = require("@angular/router");
var admin_guard_service_1 = require("./admin-guard.service");
var auth_component_1 = require("./auth.component");
var admin_component_1 = require("./admin.component");
// import { AuthGuardService } from './auth-guard.service';
var routes = [
    {
        path: 'login',
        component: auth_component_1.AuthComponent,
        data: {
            mode: 'login'
        }
    },
    {
        path: 'register',
        component: auth_component_1.AuthComponent,
        data: {
            mode: 'register'
        }
    },
    {
        path: 'reset',
        component: auth_component_1.AuthComponent,
        data: {
            mode: 'reset'
        }
    },
    {
        path: 'admin',
        component: admin_component_1.AdminComponent,
        canActivate: [admin_guard_service_1.AdminGuardService],
        data: {
            mode: 'user'
        }
    }
];
exports.authRouting = router_1.RouterModule.forChild(routes);
//# sourceMappingURL=auth.routing.js.map