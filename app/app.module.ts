import { NgModule } from '@angular/core';

//components
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard.component';
import { ExampleComponent } from './example.component';
import { PageNotFoundComponent } from './page-not-found.component';
import { AuthorizationRequiredComponent } from './authorization-required.component';

import { routing,
         appRoutingProviders } from './app.routing';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

import { Http } from '@angular/http';

//modules
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule }     from '@angular/http';
import { UtilityModule } from './utilities/utility.module';
import { AuthModule } from './loopback-auth/auth.module';
import { I18nModule } from './i18n/i18n.module';
import { SourceModule } from './source/source.module';



@NgModule({
  imports: [
    BrowserModule,
    routing,
    HttpModule,
    UtilityModule,
    AuthModule,
    I18nModule,
    SourceModule
  ],
  declarations: [
    AppComponent,
    DashboardComponent,
    ExampleComponent,
    PageNotFoundComponent,
    AuthorizationRequiredComponent
  ],
  bootstrap: [ AppComponent ],
  providers: [
    //{ provide: VocableService, useClass: VocableOnlineService },#
    ToastsManager
  ]
})
export class AppModule{}
