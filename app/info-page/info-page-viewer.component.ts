import { Component, OnInit} from '@angular/core';

import { InfoPage } from './info-page';
import { InfoPageService } from './info-page.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  moduleId:     module.id,
  selector:    'info-page-viewer',
  template: `
    <info-page [page]="page"></info-page>
  `,
  styleUrls: [],
  providers: []
})
export class InfoPageViewerComponent implements OnInit{
  public page: InfoPage = InfoPage.createEmptyPage();

  constructor(
    private pageService: InfoPageService,
    private router: Router,
    private route: ActivatedRoute
  ){}

  ngOnInit(){
    this.route.params.subscribe(
      params => this.pageService.loadOneByName(params['id']).then(
        (page) => this.page = page
      )
    );
  }

}
