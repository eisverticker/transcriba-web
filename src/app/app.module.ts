import { NgModule } from '@angular/core';

// components
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard.component';
import { PageNotFoundComponent } from './page-not-found.component';
import { AuthorizationRequiredComponent } from './authorization-required.component';

import { routing } from './app.routing';

// modules
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UtilityModule } from './utilities/utility.module';
import { AuthModule } from './loopback-auth/auth.module';
import { I18nModule } from './i18n/i18n.module';
import { SourceModule } from './source/source.module';
import { InfoPageModule } from './info-page/info-page.module';
import { TranscribaModule } from './transcriba/transcriba.module';
import { EditorModule } from './editor/editor.module';
import { ScoreModule } from './score/score.module';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TranslateModule } from '@ngx-translate/core';



@NgModule({
  imports: [
    BrowserModule,
    routing,
    BrowserAnimationsModule,
    HttpClientModule,
    UtilityModule,
    AuthModule,
    I18nModule,
    TranslateModule.forRoot(),
    SourceModule,
    InfoPageModule,
    TranscribaModule,
    EditorModule,
    ToastrModule.forRoot(),
    ScoreModule,
    FontAwesomeModule
  ],
  declarations: [
    AppComponent,
    DashboardComponent,
    PageNotFoundComponent,
    AuthorizationRequiredComponent
  ],
  bootstrap: [ AppComponent ],
  providers: []
})
export class AppModule {}
