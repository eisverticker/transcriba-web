"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var router_1 = require("@angular/router");
var employee_guard_service_1 = require("../loopback-auth/employee-guard.service");
// components
// import { InfoPageDiscussionComponent } from './info-page-discussion.component';
var info_page_viewer_component_1 = require("./info-page-viewer.component");
var info_page_edit_component_1 = require("./info-page-edit.component");
var info_page_management_component_1 = require("./info-page-management.component");
// import { AuthGuardService } from './auth-guard.service';
var routes = [
    {
        path: 'pages/:id',
        component: info_page_edit_component_1.InfoPageEditComponent,
        canActivate: [employee_guard_service_1.EmployeeGuardService]
    },
    {
        path: 'pages',
        component: info_page_management_component_1.InfoPageManagementComponent,
        canActivate: [employee_guard_service_1.EmployeeGuardService]
    },
    {
        path: 'info/:id/discussion',
        component: info_page_viewer_component_1.InfoPageViewerComponent,
        data: {
            'mode': 'discussion'
        }
    },
    {
        path: 'info/:id',
        component: info_page_viewer_component_1.InfoPageViewerComponent,
        data: {
            'mode': 'viewer'
        }
    }
];
exports.infoPageRouting = router_1.RouterModule.forChild(routes);
//# sourceMappingURL=info-page.routing.js.map