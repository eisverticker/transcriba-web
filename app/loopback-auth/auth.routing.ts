import { Routes, RouterModule } from '@angular/router';
import { AdminGuardService } from './admin-guard.service';

import { AuthComponent } from './auth.component';
import { AdminComponent } from './admin.component';


// import { AuthGuardService } from './auth-guard.service';

const routes: Routes = [
  {
    path: 'login',
    component: AuthComponent,
    data: {
      mode: 'login'
    }
  },
  {
    path: 'register',
    component: AuthComponent,
    data: {
      mode: 'register'
    }
  },
  {
    path: 'reset',
    component: AuthComponent,
    data: {
      mode: 'reset'
    }
  },
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [AdminGuardService],
    data: {
      mode: 'user'
    }
  }
];

export const authRouting = RouterModule.forChild(routes);
