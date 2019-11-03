import { NgModule }       from '@angular/core';

// components
// ..

// modules
import { BrowserModule } from '@angular/platform-browser';
import { UtilityModule } from '../utilities/utility.module';
import { AuthModule } from '../loopback-auth/auth.module';

// services
import { VotingService } from './voting.service';
import { HttpClientModule } from '@angular/common/http';

// routing
// ..

@NgModule({
    declarations: [],
    imports:      [
      BrowserModule,
      HttpClientModule,
      UtilityModule,
      AuthModule
    ],
    exports: [],
    bootstrap:    [],
    providers: [
      VotingService
    ]
})
export class VotingModule {}
