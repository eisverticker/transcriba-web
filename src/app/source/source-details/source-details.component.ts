import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Source } from '../source';
import { SourceService } from '../source.service';
import { NotificationService } from '../../utility/notification.service';
import { Notification } from '../../utility/notification';

@Component({
  selector: 'src-source-details',
  templateUrl: './source-details.component.html',
  styleUrls: ['./source-details.component.scss']
})
export class SourceDetailsComponent implements OnInit {

  @Input() source: Source;
  @Output() saved = new EventEmitter<Source>();
  @Output() abort = new EventEmitter<void>();
  public isSaving = false;
  public isLastSaveFailed = false;

  constructor(
    private sourceService: SourceService,
    private notify: NotificationService
  ) {}

  ngOnInit() {}

  save() {
    this.isSaving = true;
    this.sourceService.save(this.source).then(
      () => {
        this.saved.emit(this.source);
        this.isSaving = false;
      },
      (err) => {
        this.isLastSaveFailed = true;
        this.notify.notify(new Notification('request.fail', ['fail']));
        this.isSaving = false;
      }
    );
  }

  abortEditing() {
    this.abort.emit(null);
  }

}
