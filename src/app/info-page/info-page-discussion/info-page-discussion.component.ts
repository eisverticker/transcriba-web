import { Component, OnInit, Input } from '@angular/core';

import { InfoPage } from '../info-page';

@Component({
  selector: 'inf-info-page-discussion',
  templateUrl: './info-page-discussion.component.html',
  styleUrls: ['./info-page-discussion.component.scss']
})
export class InfoPageDiscussionComponent implements OnInit {
  @Input() page: InfoPage;

  constructor() { }

  ngOnInit() {
  }

}
