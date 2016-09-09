import { Component, OnInit, Input} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  moduleId:     module.id,
  selector:    'sub-navbar',
  template: `
    <ul style="margin-bottom: 20px;" class="nav nav-pills">
      <li *ngFor="let item of items" role="presentation" routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}">
        <a [routerLink]="item.route">{{ item.name | translate }}</a>
      </li>
    </ul>
  `,
  styleUrls: []
})
export class SubNavbarComponent implements OnInit{
  @Input() items: Array<{ name: string, route: string  }> = [];

  constructor(){}

  ngOnInit(){}

}
