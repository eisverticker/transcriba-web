import { NgModule } from '@angular/core';

// components
import { ImportFormComponent } from './import-form.component';
import { ExplorerComponent } from './explorer.component';
import { ObjectDetailComponent } from './object-detail.component';
import { RevisionHistoryComponent } from './revision-history.component';
import { TranscriptionViewerComponent } from './transcription-viewer.component';
import { OverviewComponent } from './overview.component';
import { VotingSuggestionComponent } from './voting-suggestion.component';
import { BusyWidgetComponent } from './busy-widget.component';

// modules
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { I18nModule } from '../i18n/i18n.module';
import { UtilityModule } from '../utilities/utility.module';
import { AuthModule } from '../loopback-auth/auth.module';
import { GadgetModule } from '../gadgets/gadget.module';
import { SourceModule } from '../source/source.module';
import { DiscussionModule } from '../discussion/discussion.module';
import { ScoreModule } from '../score/score.module';
import { EditorModule } from '../editor/editor.module';
import { ImageViewerModule } from '../image-viewer/image-viewer.module';
import { VotingModule } from '../voting/voting.module';

// services
import { TranscribaService } from './transcriba.service';
import { TranscriptionService } from './transcription.service';
import { RevisionVotingService } from './revision-voting.service';

// routing
import { transcribaRouting } from './transcriba.routing';
import { HttpClientModule } from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';


@NgModule({
    declarations: [
      ImportFormComponent,
      ExplorerComponent,
      ObjectDetailComponent,
      RevisionHistoryComponent,
      OverviewComponent,
      TranscriptionViewerComponent,
      VotingSuggestionComponent,
      BusyWidgetComponent
    ],
    imports:      [
      BrowserModule,
      FormsModule,
      I18nModule,
      HttpClientModule,
      UtilityModule,
      AuthModule,
      SourceModule,
      RouterModule,
      GadgetModule,
      DiscussionModule,
      transcribaRouting,
      ScoreModule,
      EditorModule,
      ImageViewerModule,
      VotingModule,
      FontAwesomeModule
    ],
    exports: [
      ImportFormComponent,
      ExplorerComponent,
      RevisionHistoryComponent,
      VotingSuggestionComponent,
      BusyWidgetComponent
    ],
    bootstrap:  [],
    providers: [
      TranscribaService,
      TranscriptionService,
      RevisionVotingService
      // {provide: Window, useValue: window}
    ]
})
export class TranscribaModule {}
