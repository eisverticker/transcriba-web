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

import {
  MatButtonModule,
  MatCardModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatToolbarModule,
  MatIconRegistry,
  MatIconModule
} from '@angular/material';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthorizationRequiredComponent } from './authorization-required/authorization-required.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ExperimentalComponent } from './experimental/experimental.component';
import { FooterBarComponent } from './footer-bar/footer-bar.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    DashboardComponent,
    AuthorizationRequiredComponent,
    PageNotFoundComponent,
    ExperimentalComponent,
    FooterBarComponent,
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
    AppRoutingModule,
    // material design
    MatButtonModule,
    MatCardModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatToolbarModule,
    MatIconModule
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
