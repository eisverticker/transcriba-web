import { Input, Component } from '@angular/core';

import { InfoPage } from './info-page';

@Component({
  moduleId:     module.id,
  selector:    'info-page-discussion',
  template: `
    <simple-discussion *ngIf="page" [itemsPerPage]="'10'" [discussionId]="page.discussionID"></simple-discussion>
  `,
  styleUrls: []
})
export class InfoPageDiscussionComponent{
  @Input() page: InfoPage;

  constructor(){}

}
