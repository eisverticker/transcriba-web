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
import { SourceModule } from '../source/source.module';
import { DiscussionModule } from '../discussion/discussion.module';
import { ScoreModule } from '../score/score.module';
import { EditorModule } from '../editor/editor.module';
import { ImageViewerModule } from '../image-viewer/image-viewer.module';
import { VotingModule } from '../voting/voting.module';
import { TranscribaRoutingModule } from './transcriba-routing.module';

import {
  MatButtonModule,
  MatCardModule,
  MatToolbarModule,
  MatIconModule,
  MatGridListModule,
  MatTabsModule
} from '@angular/material';

// components
import { BusyWidgetComponent } from './busy-widget/busy-widget.component';
import { ImportFormComponent } from './import-form/import-form.component';
import { ObjectDetailComponent } from './object-detail/object-detail.component';
import { OverviewComponent } from './overview/overview.component';
import { RevisionHistoryComponent } from './revision-history/revision-history.component';
import { TranscriptionViewerComponent } from './transcription-viewer/transcription-viewer.component';
import { VotingSuggestionComponent } from './voting-suggestion/voting-suggestion.component';
import { ExplorerComponent } from './explorer/explorer.component';

// services
import { TranscribaService } from './transcriba.service';
import { TranscriptionService } from './transcription.service';
import { RevisionVotingService } from './revision-voting.service';
import { ObjectComponent } from './object/object.component';

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
    SourceModule,
    DiscussionModule,
    ScoreModule,
    EditorModule,
    ImageViewerModule,
    VotingModule,
    TranscribaRoutingModule,
    // material design
    MatButtonModule,
    MatCardModule,
    MatToolbarModule,
    MatIconModule,
    MatGridListModule,
    MatTabsModule
  ],
  declarations: [
    BusyWidgetComponent,
    ImportFormComponent,
    ObjectDetailComponent,
    OverviewComponent,
    RevisionHistoryComponent,
    TranscriptionViewerComponent,
    VotingSuggestionComponent,
    ExplorerComponent,
    ObjectComponent
  ],
  providers: [
    TranscribaService,
    TranscriptionService,
    RevisionVotingService
  ],
  exports: [
    ImportFormComponent,
    ExplorerComponent,
    RevisionHistoryComponent,
    VotingSuggestionComponent,
    BusyWidgetComponent,
    ExplorerComponent
  ]
})
export class TranscribaModule { }
