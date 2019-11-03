import { Input, Component } from '@angular/core';

import { InfoPage } from './info-page';

@Component({
  moduleId:     module.id,
  selector:    'tr-info-page-discussion',
  template: `
    <tr-simple-discussion *ngIf="page" [itemsPerPage]="'10'" [discussionId]="page.discussionID"></tr-simple-discussion>
  `,
  styleUrls: []
})
export class InfoPageDiscussionComponent {
  @Input() page: InfoPage;
}
