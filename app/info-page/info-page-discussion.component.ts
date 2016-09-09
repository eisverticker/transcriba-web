import { Input, Component, OnChanges} from '@angular/core';

import { InfoPage } from './info-page';
import { InfoPageService } from './info-page.service';

import { AuthService } from '../loopback-auth/auth.service';
import { User } from '../loopback-auth/user';

import { Discussion } from '../discussion/discussion';
import { DiscussionService } from '../discussion/discussion.service';

@Component({
  moduleId:     module.id,
  selector:    'info-page-discussion',
  template: `
    <simple-discussion *ngIf="discussion" [user]="user" [itemsPerPage]="'10'" [discussion]="discussion"></simple-discussion>
  `,
  styleUrls: []
})
export class InfoPageDiscussionComponent implements OnChanges{
  @Input() page: InfoPage;
  public discussion: Discussion;
  public user: User;

  constructor(
    private pageService: InfoPageService,
    private discuss: DiscussionService,
    private auth: AuthService
  ){

  }

  ngOnChanges(){
    console.log("step 1");
    this.auth.loadUser().then(
      (user) => {
        this.user = user;
        this.discuss.loadByID(this.page.discussionID).then(
          (discussion) => this.discussion = discussion,
          () => console.log("Diskussion nicht gefunden")
        );
      }
    );
  }

}
