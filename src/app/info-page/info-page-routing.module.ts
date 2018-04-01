import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// general components
import { InfoPageEditComponent } from './info-page-edit/info-page-edit.component';
import { InfoPageManagementComponent } from './info-page-management/info-page-management.component';
import { InfoPageViewerComponent } from './info-page-viewer/info-page-viewer.component';

// error handling components

// guards
import { EmployeeGuard } from '../loopback-auth/employee.guard';

const routes: Routes = [
  {
    path: 'pages/:id',
    component: InfoPageEditComponent,
    canActivate: [EmployeeGuard]
  },
  {
    path: 'pages',
    component: InfoPageManagementComponent,
    canActivate: [EmployeeGuard]
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

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class InfoPageRoutingModule {}
