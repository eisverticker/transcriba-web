import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { UtilityModule } from '../utility/utility.module';
import { LoopbackAuthModule } from '../loopback-auth/loopback-auth.module';
import { HttpClientModule } from '@angular/common/http';

import { VotingService } from './voting.service';

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    HttpClientModule,
    UtilityModule,
    LoopbackAuthModule
  ],
  declarations: [],
  providers: [
    VotingService
  ]
})
export class VotingModule { }
