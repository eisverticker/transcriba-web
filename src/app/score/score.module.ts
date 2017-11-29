// modules
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { LoopbackAuthModule } from '../loopback-auth/loopback-auth.module';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { I18nModule } from '../i18n/i18n.module';
import { ScoreRoutingModule } from './score-routing.module';
import {
  MatIconModule,
  MatToolbarModule,
  MatCardModule
} from '@angular/material';

// components
import { ScoreComponent } from './score/score.component';
import { HallOfFameComponent } from './hall-of-fame/hall-of-fame.component';

// services
import { ScoreService } from './score.service';

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    LoopbackAuthModule,
    HttpClientModule,
    ScoreRoutingModule,
    I18nModule,
    // material design
    MatIconModule,
    MatToolbarModule,
    MatCardModule

  ],
  declarations: [
    ScoreComponent,
    HallOfFameComponent
  ],
  providers: [
    ScoreService
  ],
  exports: [
    ScoreComponent,
    HallOfFameComponent
  ]
})
export class ScoreModule { }
