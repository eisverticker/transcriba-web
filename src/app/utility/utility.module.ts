import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppService } from './app.service';
import { BackendService } from './backend.service';
import { NotificationService } from './notification.service';

import { EmailValidatorDirective } from './email-validator.directive';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [EmailValidatorDirective],
  providers: [
    AppService,
    BackendService,
    NotificationService
  ]
})
export class UtilityModule { }
