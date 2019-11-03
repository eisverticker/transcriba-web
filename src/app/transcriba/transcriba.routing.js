"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var router_1 = require("@angular/router");
var employee_guard_service_1 = require("../loopback-auth/employee-guard.service");
var explorer_component_1 = require("./explorer.component");
var import_form_component_1 = require("./import-form.component");
var object_detail_component_1 = require("./object-detail.component");
var routes = [
    {
        path: 'explore',
        component: explorer_component_1.ExplorerComponent,
        data: {
            mode: 'object'
        }
    },
    /*{
      path: 'explore/objects',
      component: ExplorerComponent,
      data: {
        mode: "object"
      }
    },
    {
      path: 'explore/collection/:id',
      component: ExplorerComponent,
      data: {
        mode: "insideCollection"
      }
    },*/
    {
        path: 'import',
        component: import_form_component_1.ImportFormComponent,
        canActivate: [employee_guard_service_1.EmployeeGuardService]
    },
    {
        path: 'obj/:id',
        component: object_detail_component_1.ObjectDetailComponent,
        data: {
            mode: 'overview'
        }
    },
    {
        path: 'obj/:id/discussion',
        component: object_detail_component_1.ObjectDetailComponent,
        data: {
            mode: 'discussion'
        }
    },
    {
        path: 'obj/:id/transcribe',
        component: object_detail_component_1.ObjectDetailComponent,
        data: {
            mode: 'transcription'
        }
    },
    {
        path: 'obj/:id/viewer',
        component: object_detail_component_1.ObjectDetailComponent,
        data: {
            mode: 'viewer'
        }
    },
    {
        path: 'obj/:id/meta',
        component: object_detail_component_1.ObjectDetailComponent,
        data: {
            mode: 'meta'
        }
    },
    {
        path: 'obj/:id/chronic',
        component: object_detail_component_1.ObjectDetailComponent,
        data: {
            mode: 'chronic'
        }
    }
];
exports.transcribaRouting = router_1.RouterModule.forChild(routes);
//# sourceMappingURL=transcriba.routing.js.map