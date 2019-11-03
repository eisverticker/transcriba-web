import { NgModule }       from '@angular/core';

// components
import { AuthComponent } from './auth.component';
import { LoginFormComponent } from './login-form.component';
import { LogoutComponent } from './logout.component';
import { RegistrationFormComponent } from './registration-form.component';
import { ResetFormComponent } from './reset-form.component';
import { VerifyComponent } from './verify.component';

import { AdminComponent } from './admin.component';
import { UserManagementComponent } from './user-management.component';

// modules
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { RouterModule }   from '@angular/router';
import { UtilityModule } from '../utilities/utility.module';
import { I18nModule } from '../i18n/i18n.module';
import { GadgetModule } from '../gadgets/gadget.module';

import { HttpModule } from '@angular/http';

// services
import { AuthService } from './auth.service';
import { UserService } from './user.service';
import { AuthGuardService } from './auth-guard.service';
import { AdminGuardService } from './admin-guard.service';
import { EmployeeGuardService } from './employee-guard.service';
import { TrustedGuardService } from './trusted-guard.service';



// routing
import { authRouting } from './auth.routing';

@NgModule({
    declarations: [
      AuthComponent,
      LoginFormComponent,
      LogoutComponent,
      RegistrationFormComponent,
      ResetFormComponent,
      VerifyComponent,
      AdminComponent,
      UserManagementComponent
    ],
    imports:      [
      BrowserModule,
      FormsModule,
      UtilityModule,
      RouterModule,
      I18nModule,
      HttpModule,
      GadgetModule,
      authRouting
    ],
    bootstrap:    [],
    providers: [
      AuthService,
      UserService,
      AuthGuardService,
      TrustedGuardService,
      EmployeeGuardService,
      AdminGuardService
    ]
})
export class AuthModule {}
