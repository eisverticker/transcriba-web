import { NgModule }       from '@angular/core';

// components
import { ScoreComponent } from './score.component';
import { HallOfFameComponent } from './hall-of-fame.component';

// pipes

// modules
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { AuthModule } from '../loopback-auth/auth.module';

// services
import { ScoreService } from './score.service';

// routing
import { scoreRouting } from './score.routing';


@NgModule({
    declarations: [
      ScoreComponent,
      HallOfFameComponent
    ],
    imports:      [
      BrowserModule,
      FormsModule,
      AuthModule,
      scoreRouting
    ],
    exports: [ScoreComponent, HallOfFameComponent],
    bootstrap:  [],
    providers: [
      ScoreService
    ]
})
export class ScoreModule {}
