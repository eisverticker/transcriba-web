import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { LeafletModule } from './leaflet/leaflet.module';
import { I18nModule } from './i18n/i18n.module';
import { UtilityModule } from './utility/utility.module';
import { TranscribaUiModule } from './transcriba-ui/transcriba-ui.module';
import { AppRoutingModule } from './app-routing.module';
import { InfoPageModule } from './info-page/info-page.module';
import { ScoreModule } from './score/score.module';
import { SourceModule } from './source/source.module';
import { TranscribaModule } from './transcriba/transcriba.module';
import { TranscribaDedicatedModule } from './transcriba-dedicated/transcriba-dedicated.module';

import {
  MatIconRegistry
} from '@angular/material';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule, // check app.routing.ts
    I18nModule,
    LeafletModule, // tile viewer
    NgbModule.forRoot(), // bootstrap components
    TranscribaUiModule,
    UtilityModule,
    InfoPageModule,
    ScoreModule,
    SourceModule,
    TranscribaModule,
    TranscribaDedicatedModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(mdIconRegistry: MatIconRegistry) {
    mdIconRegistry.registerFontClassAlias('fontawesome', 'fa');
    // set font awesom icons as default
    // mdIconRegistry.setDefaultFontSetClass('fa');
  }
}
