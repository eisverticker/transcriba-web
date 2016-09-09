import { Component, OnInit} from '@angular/core';

import { InfoPage } from './info-page';
import { InfoPageService } from './info-page.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  moduleId:     module.id,
  selector:    'info-page-viewer',
  template: `
    <sub-navbar [items]="navItems"></sub-navbar>
    <div *ngIf="page" [ngSwitch]="mode">
      <be-patient *ngSwitchCase="'loading'"></be-patient>
      <info-page [page]="page" *ngSwitchCase="'viewer'"></info-page>
      <info-page-discussion [page]="page" *ngSwitchCase="'discussion'"></info-page-discussion>
    </div>
  `,
  styleUrls: []
})
export class InfoPageViewerComponent implements OnInit{
  page: InfoPage;
  mode: string = "loading";
  navItems: Array<any> = [];

  constructor(
    private pageService: InfoPageService,
    private router: Router,
    private route: ActivatedRoute
  ){}

  ngOnInit(){
    this.route.data.subscribe(
      (data) => {
        this.mode = data['mode'];
        this.route.params.subscribe(
          params => this.pageService.loadOneByName(params['id']).then(
            (page) => {
              this.page = page;
              this.initNavigation(page);
            },
            (err) => this.router.navigate(['404'])
          )
        );
      }
    );

  }

  private initNavigation(page: InfoPage){

    if(page.show_discussion){
      this.navItems = [
        {
          name: "general.page",
          route: '/info/'+page.name
        },
        {
          name: "general.discussion",
          route: '/info/'+page.name+'/discussion'
        },
      ];
    }
  }

}
