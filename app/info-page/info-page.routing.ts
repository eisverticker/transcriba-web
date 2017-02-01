import { Routes, RouterModule } from '@angular/router';
import { EmployeeGuardService } from '../loopback-auth/employee-guard.service';

// components
// import { InfoPageDiscussionComponent } from './info-page-discussion.component';
import { InfoPageViewerComponent } from './info-page-viewer.component';
import { InfoPageEditComponent } from './info-page-edit.component';
import { InfoPageManagementComponent } from './info-page-management.component';


// import { AuthGuardService } from './auth-guard.service';

const routes: Routes = [
  {
    path: 'pages/:id',
    component: InfoPageEditComponent,
    canActivate: [EmployeeGuardService]
  },
  {
    path: 'pages',
    component: InfoPageManagementComponent,
    canActivate: [EmployeeGuardService]
  },
  {
    path: 'info/:id/discussion',
    component: InfoPageViewerComponent,
    data: {
      'mode': 'discussion'
    }
  },
  {
    path: 'info/:id',
    component: InfoPageViewerComponent,
    data: {
      'mode': 'viewer'
    }
  }
];

export const infoPageRouting = RouterModule.forChild(routes);
