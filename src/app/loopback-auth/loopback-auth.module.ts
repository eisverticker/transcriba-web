import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { UtilityModule } from '../utility/utility.module';
import { I18nModule } from '../i18n/i18n.module';
import { TranscribaUiModule } from '../transcriba-ui/transcriba-ui.module';
import { LoopbackAuthRoutingModule } from './loopback-auth-routing.module';

import {
  MatCardModule,
  MatIconModule,
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
  MatToolbarModule
} from '@angular/material';

import { AdminComponent } from './admin/admin.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { LogoutComponent } from './logout/logout.component';
import { RegistrationFormComponent } from './registration-form/registration-form.component';
import { ResetFormComponent } from './reset-form/reset-form.component';
import { UserManagementComponent } from './user-management/user-management.component';
import { VerifyComponent } from './verify/verify.component';
import { AuthComponent } from './auth/auth.component';

// # services
import { AuthService } from './auth.service';
import { UserService } from './user.service';

// ## Guards
import { AuthGuard } from './auth.guard';
import { TrustedGuard } from './trusted.guard';
import { EmployeeGuard } from './employee.guard';
import { AdminGuard } from './admin.guard';

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    UtilityModule,
    RouterModule,
    I18nModule,
    HttpClientModule,
    TranscribaUiModule,
    LoopbackAuthRoutingModule,
    // material
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatToolbarModule
  ],
  declarations: [
    AdminComponent,
    LoginFormComponent,
    LogoutComponent,
    RegistrationFormComponent,
    ResetFormComponent,
    UserManagementComponent,
    VerifyComponent,
    AuthComponent
  ],
  providers: [
    UserService,
    AuthService,
    AuthGuard,
    TrustedGuard,
    EmployeeGuard,
    AdminGuard
  ]
})
export class LoopbackAuthModule { }
