import { NgModule }       from '@angular/core';

// components
// ..

// modules
import { BrowserModule } from '@angular/platform-browser';
import { UtilityModule } from '../utilities/utility.module';
import { AuthModule } from '../loopback-auth/auth.module';
import { HttpModule } from '@angular/http';

// services
import { VotingService } from './voting.service';

// routing
// ..

@NgModule({
    declarations: [],
    imports:      [
      BrowserModule,
      HttpModule,
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
