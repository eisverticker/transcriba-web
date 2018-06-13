import { Component, OnInit } from '@angular/core';

import { TranscribaService } from '../transcriba.service';
import { SourceService } from '../../source/source.service';
import { LoggerService } from '../../utility/logger.service';
import { NotificationService } from '../../utility/notification.service';

import { FormRequestHandling } from '../../utility/form-request-handling';
import { Source } from '../../source/source';
import { Notification } from '../../utility/notification';

@Component({
  selector: 'tr-import-form',
  templateUrl: './import-form.component.html',
  styleUrls: ['./import-form.component.scss']
})
export class ImportFormComponent extends FormRequestHandling implements OnInit {
  static logger = LoggerService.getCustomLogger(ImportFormComponent.name);

  public sources: Array<Source>;
  public foreignID: string;
  public selectedSourceID: Source; // id

  constructor(
    private transcriba: TranscribaService,
    private sourceService: SourceService,
    private notify: NotificationService
  ) {
    super();
  }

  ngOnInit() {
    this.sourceService.loadAllSources().then(
      (sources) => {
        this.sources = sources.filter(
          source => source.activated
        );

        // default selection (first element)
        if (this.sources.length > 0) {
          this.selectedSourceID = this.sources[0].id;
        }
      },
      err => ImportFormComponent.logger.error('ImportFormComponent@ngOnInit', err)
    );
  }

  import() {
    const selectedSource = this.getSourceById(this.selectedSourceID);
    const request = this.transcriba.import(selectedSource, this.foreignID);

    this.watchRequestState(request);

    request.then(
      () => this.notify.notify(new Notification('request.success', ['success'])),
      (err) => ImportFormComponent.logger.error('ImportFormComponent@import', err)
    );
  }

  private getSourceById(id: any) {
    for (let i = 0; i < this.sources.length; i++) {
      if (this.sources[i].id === id) {
        return this.sources[i];
      }
    }
    throw new Error('source id not found');
  }


}
