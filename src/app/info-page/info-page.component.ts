import { Component, Input } from '@angular/core';

import { InfoPage } from './info-page';

@Component({
  moduleId:     module.id,
  selector:    'tr-info-page',
  template: `
    <div [innerHTML]="page.content"></div>
  `,
  styleUrls: []
})
export class InfoPageComponent {
  @Input() page: InfoPage;
}
