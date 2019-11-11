import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// components
import { AdminComponent } from './admin/admin.component';
import { AuthComponent } from './auth/auth.component';

// guards
import { AdminGuard } from './admin.guard';

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
    canActivate: [AdminGuard],
    data: {
      mode: 'user'
    }
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule // necessary
  ]
})
export class LoopbackAuthRoutingModule {}
