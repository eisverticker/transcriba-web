import { Component, OnInit } from '@angular/core';

import { Source } from '../source';
import { SourceService } from '../source.service';
import { NotificationService } from '../../utility/notification.service';
import { Notification } from '../../utility/notification';

import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'src-source-details',
  templateUrl: './source-details.component.html',
  styleUrls: ['./source-details.component.scss']
})
export class SourceDetailsComponent implements OnInit {

  public source: Source = Source.createEmptySource();
  public isSaving = false;
  public isLastSaveFailed = false;

  constructor(
    private sourceService: SourceService,
    private notify: NotificationService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.params.subscribe(
      (params) => {
        if (params['id'] === 'new') {
          this.source = Source.createEmptySource();
        }else {
          this.sourceService.loadByID(params['id']).then(
            (source) => this.source = source,
            (err) => {
              this.notify.notify(new Notification('request.fail', ['fail']));
              this.router.navigate(['/sources']);
            }
          );
        }
      }
    );
  }

  save() {
    this.isSaving = true;
    this.sourceService.save(this.source).then(
      () => {
        this.notify.notify(new Notification('request.success', ['success']));
        this.router.navigate(['/sources']);
        this.isSaving = false;
      },
      (err) => {
        this.isLastSaveFailed = true;
        this.notify.notify(new Notification('request.fail', ['fail']));
        this.isSaving = false;
      }
    );
  }

}
