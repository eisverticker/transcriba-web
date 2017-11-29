import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { I18nModule } from '../i18n/i18n.module';
import { UtilityModule } from '../utility/utility.module';
import { TranscribaUiModule } from '../transcriba-ui/transcriba-ui.module';
import { ImageViewerModule } from '../image-viewer/image-viewer.module';

// material
import {
  MatCardModule,
  MatIconModule,
  MatButtonModule
} from '@angular/material';

// components
import { EditorComponent } from './editor/editor.component';
import { TeiContainerComponent } from './tei-container/tei-container.component';
import { TeiElementComponent } from './tei-element/tei-element.component';
import { RootComponent } from './root/root.component';

// services
import { EditorService } from './editor.service';

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    I18nModule,
    UtilityModule,
    TranscribaUiModule,
    ImageViewerModule,
    // material
    MatCardModule,
    MatIconModule,
    MatButtonModule
  ],
  declarations: [
    EditorComponent,
    TeiContainerComponent,
    TeiElementComponent,
    RootComponent
  ],
  providers: [
    EditorService
  ],
  exports: [
    EditorComponent,
    TeiContainerComponent,
    TeiElementComponent,
    RootComponent
  ]
})
export class EditorModule { }
