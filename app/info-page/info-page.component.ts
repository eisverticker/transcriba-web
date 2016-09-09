import { Component, OnChanges, Input} from '@angular/core';

import { InfoPage } from './info-page';

@Component({
  moduleId:     module.id,
  selector:    'info-page',
  template: `
    <div [innerHTML]="page.content"></div>
  `,
  styleUrls: []
})
export class InfoPageComponent implements OnChanges{
  @Input() page: InfoPage;

  constructor(){}

  ngOnChanges(){

  }

}
