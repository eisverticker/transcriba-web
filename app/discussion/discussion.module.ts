import { NgModule }       from '@angular/core';

//components
import { CommentComponent } from './comment.component';
import { DiscussionComponent } from './discussion.component';
import { DiscussionWidgetComponent } from './discussion-widget.component';

//modules
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { VotingModule }   from '../voting/voting.module';
import { I18nModule } from '../i18n/i18n.module';
import { UtilityModule } from '../utilities/utility.module';
import { AuthModule } from '../loopback-auth/auth.module';
import { GadgetModule } from '../gadgets/gadget.module';
import { HttpModule } from '@angular/http';

//services
import { DiscussionService } from './discussion.service';
import { CommentVotingService } from './comment-voting.service';

@NgModule({
    declarations: [
      CommentComponent,
      DiscussionComponent,
      DiscussionWidgetComponent
    ],
    imports:      [
      BrowserModule,
      FormsModule,
      I18nModule,
      HttpModule,
      UtilityModule,
      AuthModule,
      VotingModule,
      //RouterModule,
      GadgetModule
    ],
    exports: [
      CommentComponent,
      DiscussionComponent,
      DiscussionWidgetComponent
    ],
    bootstrap:    [],
    providers: [
      DiscussionService,
      CommentVotingService
    ]
})
export class DiscussionModule {}
