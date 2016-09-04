import { Routes, RouterModule } from '@angular/router';

import { AuthGuardService } from '../loopback-auth/auth-guard.service';
import { AdminGuardService } from '../loopback-auth/admin-guard.service';

//components
import { InfoPageViewerComponent } from './info-page-viewer.component';
import { InfoPageEditComponent } from './info-page-edit.component';
import { InfoPageManagementComponent } from './info-page-management.component';


//import { AuthGuardService } from './auth-guard.service';

const routes: Routes = [
  {
    path: 'pages/:id',
    component: InfoPageEditComponent,
    canActivate: [AdminGuardService]
  },
  {
    path: 'pages',
    component: InfoPageManagementComponent,
    canActivate: [AdminGuardService]
  },
  {
    path: 'info/:id',
    component: InfoPageViewerComponent
  },
];

export const infoPageRouting = RouterModule.forChild(routes);
