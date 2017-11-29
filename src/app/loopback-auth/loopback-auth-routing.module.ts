import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// components
import { AdminComponent } from './admin/admin.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { LogoutComponent } from './logout/logout.component';
import { RegistrationFormComponent } from './registration-form/registration-form.component';
import { ResetFormComponent } from './reset-form/reset-form.component';
import { UserManagementComponent } from './user-management/user-management.component';
import { VerifyComponent } from './verify/verify.component';
import { AuthComponent } from './auth/auth.component';

// guards
import { AuthGuard } from './auth.guard';
import { AdminGuard } from './admin.guard';
import { EmployeeGuard } from './employee.guard';
import { TrustedGuard } from './trusted.guard';

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
