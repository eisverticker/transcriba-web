import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { I18nModule } from '../i18n/i18n.module';
import { UtilityModule } from '../utility/utility.module';
import { LoopbackAuthModule } from '../loopback-auth/loopback-auth.module';
import { TranscribaUiModule } from '../transcriba-ui/transcriba-ui.module';
import { DiscussionModule } from '../discussion/discussion.module';

// routing
import { InfoPageRoutingModule } from './info-page-routing.module';

// material
import {
  MatToolbarModule,
  MatIconModule,
  MatButtonModule,
  MatDialogModule
} from '@angular/material';

// components
import { InfoPageDiscussionComponent } from './info-page-discussion/info-page-discussion.component';
import { InfoPageEditComponent } from './info-page-edit/info-page-edit.component';
import { InfoPageManagementComponent } from './info-page-management/info-page-management.component';
import { InfoPageViewerComponent } from './info-page-viewer/info-page-viewer.component';
import { InfoPageComponent } from './info-page/info-page.component';
import { InfoDialogComponent } from './info-dialog/info-dialog.component';

// services
import { InfoPageService } from './info-page.service';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    BrowserModule,
    FormsModule,
    RouterModule,
    I18nModule,
    UtilityModule,
    LoopbackAuthModule,
    TranscribaUiModule,
    DiscussionModule,
    MatDialogModule,
    InfoPageRoutingModule,
    // material
    MatToolbarModule,
    MatIconModule,
    MatButtonModule
  ],
  declarations: [
    InfoPageDiscussionComponent,
    InfoPageEditComponent,
    InfoPageManagementComponent,
    InfoPageViewerComponent,
    InfoPageComponent,
    InfoDialogComponent
  ],
  exports: [
    InfoPageViewerComponent,
    InfoPageComponent,
    InfoDialogComponent
  ],
  providers: [
    InfoPageService
  ],
  entryComponents: [
    InfoDialogComponent
  ]
})
export class InfoPageModule { }
