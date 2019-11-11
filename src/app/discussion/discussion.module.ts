import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { VotingModule } from '../voting/voting.module';
import { I18nModule } from '../i18n/i18n.module';
import { UtilityModule } from '../utility/utility.module';
import { LoopbackAuthModule } from '../loopback-auth/loopback-auth.module';
import { TranscribaUiModule } from '../transcriba-ui/transcriba-ui.module';
import { HttpClientModule } from '@angular/common/http';
import {
  MatCardModule,
  MatIconModule,
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
  MatListModule
} from '@angular/material';

// components
import { CommentComponent } from './comment/comment.component';
import { DiscussionComponent } from './discussion/discussion.component';
import { DiscussionWidgetComponent } from './discussion-widget/discussion-widget.component';

// services
import { DiscussionService } from './discussion.service';
import { CommentVotingService } from './comment-voting.service';

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    VotingModule,
    I18nModule,
    UtilityModule,
    LoopbackAuthModule,
    TranscribaUiModule,
    HttpClientModule,
    // material
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatListModule
  ],
  declarations: [
    CommentComponent,
    DiscussionComponent,
    DiscussionWidgetComponent
  ],
  exports: [
    CommentComponent,
    DiscussionComponent,
    DiscussionWidgetComponent
  ],
  providers: [
    DiscussionService,
    CommentVotingService
  ]
})
export class DiscussionModule { }
