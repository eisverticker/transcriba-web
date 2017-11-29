import { Component, Input, OnInit } from '@angular/core';

import { InfoPage } from '../info-page';


@Component({
  selector: 'inf-info-page',
  templateUrl: './info-page.component.html',
  styleUrls: ['./info-page.component.scss']
})
export class InfoPageComponent implements OnInit {

  @Input() page: InfoPage;

  constructor() { }

  ngOnInit() {
  }

}
