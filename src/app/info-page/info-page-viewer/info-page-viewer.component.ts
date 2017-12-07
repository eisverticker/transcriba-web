import { Component, OnInit } from '@angular/core';

import { InfoPage } from '../info-page';
import { InfoPageService } from '../info-page.service';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'inf-info-page-viewer',
  templateUrl: './info-page-viewer.component.html',
  styleUrls: ['./info-page-viewer.component.scss']
})
export class InfoPageViewerComponent implements OnInit {
  page: InfoPage;
  mode = 'loading';
  navItems: Array<any> = [];
  discussionLink: string;

  constructor(
    private pageService: InfoPageService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
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

  private initNavigation(page: InfoPage) {

    if (page.show_discussion) {
      this.navItems = [
        {
          name: 'general.page',
          route: '/info/' + page.name
        },
        {
          name: 'general.discussion',
          route: '/info/' + page.name + '/discussion'
        },
      ];
      this.discussionLink = '/info/' + page.name + '/discussion';
    }else {
      this.navItems = [];
    }
  }

}
