import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { InfoPage } from '../info-page';
import { InfoPageService } from '../info-page.service';
import { AuthService } from '../../loopback-auth/auth.service';
import { User } from '../../loopback-auth/user';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'inf-info-page-viewer',
  templateUrl: './info-page-viewer.component.html',
  styleUrls: ['./info-page-viewer.component.scss']
})
export class InfoPageViewerComponent implements OnInit {
  page: InfoPage;
  mode = 'loading';
  user: Observable<User>;
  navItems: Array<any> = [];
  discussionLink: string;

  constructor(
    private pageService: InfoPageService,
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService
  ) {
    this.user = this.authService.user;
  }

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
    } else {
      this.navItems = [];
    }
  }

}
