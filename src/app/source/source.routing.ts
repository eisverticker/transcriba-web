import { Routes, RouterModule } from '@angular/router';
import { AdminGuardService } from '../loopback-auth/admin-guard.service';

import { SourceComponent } from './source.component';
import { SourceDetailsComponent } from './source-details.component';

const routes: Routes = [
  {
    path: 'sources/:id',
    component: SourceDetailsComponent,
    canActivate: [AdminGuardService]
  },
  {
    path: 'sources',
    component: SourceComponent,
    canActivate: [AdminGuardService]
  }
];

export const sourceRouting = RouterModule.forChild(routes);
