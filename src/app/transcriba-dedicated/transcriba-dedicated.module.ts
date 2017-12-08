import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LoopbackAuthModule } from '../loopback-auth/loopback-auth.module';
import { TranscribaModule } from '../transcriba/transcriba.module';
import { ScoreModule } from '../score/score.module';
import { I18nModule } from '../i18n/i18n.module';

import { NavbarComponent } from './navbar/navbar.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthorizationRequiredComponent } from './authorization-required/authorization-required.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { FooterBarComponent } from './footer-bar/footer-bar.component';

import {
  MatButtonModule,
  MatCardModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatToolbarModule,
  MatIconRegistry,
  MatIconModule,
  MatDialogModule
} from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    LoopbackAuthModule,
    RouterModule,
    TranscribaModule,
    ScoreModule,
    I18nModule,
    // material design
    MatButtonModule,
    MatCardModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatToolbarModule,
    MatIconModule,
    MatDialogModule    
  ],
  declarations: [
    NavbarComponent,
    DashboardComponent,
    AuthorizationRequiredComponent,
    PageNotFoundComponent,
    FooterBarComponent
  ],
  exports: [
    NavbarComponent,
    DashboardComponent,
    AuthorizationRequiredComponent,
    PageNotFoundComponent,
    FooterBarComponent
  ]
})
export class TranscribaDedicatedModule { }
