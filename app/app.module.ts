import { NgModule } from '@angular/core';

//components
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard.component';
import { ExampleComponent } from './example.component';
import { PageNotFoundComponent } from './page-not-found.component';
import { AuthorizationRequiredComponent } from './authorization-required.component';

import { routing,
         appRoutingProviders } from './app.routing';

import { Http } from '@angular/http';

//modules
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule }     from '@angular/http';
import { UtilityModule } from './utilities/utility.module';
import { AuthModule } from './loopback-auth/auth.module';
import { I18nModule } from './i18n/i18n.module';
import { SourceModule } from './source/source.module';
import { InfoPageModule } from './info-page/info-page.module';
import { TranscribaModule } from './transcriba/transcriba.module';
import { TranscriberModule } from './transcriber/transcriber.module';
import { ToastModule } from 'ng2-toastr/ng2-toastr';



@NgModule({
  imports: [
    BrowserModule,
    routing,
    HttpModule,
    UtilityModule,
    AuthModule,
    I18nModule,
    SourceModule,
    InfoPageModule,
    TranscribaModule,
    TranscriberModule,
    ToastModule
  ],
  declarations: [
    AppComponent,
    DashboardComponent,
    ExampleComponent,
    PageNotFoundComponent,
    AuthorizationRequiredComponent
  ],
  bootstrap: [ AppComponent ],
  providers: []
})
export class AppModule{}
