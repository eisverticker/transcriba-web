import { Component, OnInit } from '@angular/core';

import { Source } from '../source';
import { SourceService } from '../source.service';
import { NotificationService } from '../../utility/notification.service';
import { Notification } from '../../utility/notification';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'src-source-editor',
  templateUrl: './source-editor.component.html',
  styleUrls: ['./source-editor.component.scss']
})
export class SourceEditorComponent implements OnInit {
  public currentSource: Source;
  public mode: string;

  constructor(
    private sourceService: SourceService,
    private notify: NotificationService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    return this.route.params.subscribe(
      (params) => {
        if (params['id'] === 'new') {
          this.mode = 'metadataMode';
          this.currentSource = Source.createEmptySource();
        } else {
          this.mode = 'detailMode';
          this.sourceService.loadByID(params['id']).then(
            (source) => this.currentSource = source,
            (err) => {
              this.notify.notify(new Notification('request.fail', ['fail']));
              this.router.navigate(['/sources']);
            }
          );
        }
      }
    );
  }

  completeEditing($source) {
    this.notify.notify(new Notification('request.success', ['success']));
    this.setSource($source);
    this.router.navigate(['/sources']);
  }

  completeMetadataImport($source) {
    this.setSource($source);
    this.mode = 'detailMode';
  }

  abortEditing() {
    this.router.navigate(['/sources']);
  }

  setSource(source) {
    this.currentSource = source;
  }

}
