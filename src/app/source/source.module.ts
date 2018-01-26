import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { I18nModule } from '../i18n/i18n.module';
import { UtilityModule } from '../utility/utility.module';
import { LoopbackAuthModule } from '../loopback-auth/loopback-auth.module';
import { TranscribaUiModule } from '../transcriba-ui/transcriba-ui.module';
import { HttpClientModule } from '@angular/common/http';
import { SourceRoutingModule } from './source-routing.module';

// material
import {
  MatToolbarModule,
  MatButtonModule,
  MatCardModule,
  MatFormFieldModule,
  MatInputModule,
  MatSelectModule,
  MatSlideToggleModule,
  MatRadioModule
} from '@angular/material';

// components
import { SourceDetailsComponent } from './source-details/source-details.component';
import { SourceComponent } from './source/source.component';

// services
import { SourceService } from './source.service';
import { SourceMetadataComponent } from './source-metadata/source-metadata.component';
import { SourceEditorComponent } from './source-editor/source-editor.component';

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    RouterModule,
    I18nModule,
    UtilityModule,
    LoopbackAuthModule,
    TranscribaUiModule,
    HttpClientModule,
    SourceRoutingModule,
    // material design
    MatToolbarModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatRadioModule
  ],
  declarations: [
    SourceDetailsComponent,
    SourceComponent,
    SourceMetadataComponent,
    SourceEditorComponent
  ],
  providers: [
    SourceService
  ]
})
export class SourceModule { }
