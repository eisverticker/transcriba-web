import { Component, OnInit } from '@angular/core';

import { FormRequestHandling } from '../../utility/form-request-handling';
import { TranscribaService } from '../transcriba.service';
import { Source } from '../../source/source';
import { SourceService } from '../../source/source.service';

import { Notification } from '../../utility/notification';
import { NotificationService } from '../../utility/notification.service';

@Component({
  selector: 'tr-import-form',
  templateUrl: './import-form.component.html',
  styleUrls: ['./import-form.component.scss']
})
export class ImportFormComponent extends FormRequestHandling implements OnInit {

  public sources: Array<Source>;
  public foreignID: string;
  public selectedSourceID: Source; // id

  constructor(
    private transcriba: TranscribaService,
    private sourceService: SourceService,
    private notifier: NotificationService
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
      err => console.log(err)
    );
  }

  import() {
    const selectedSource = this.getSourceById(this.selectedSourceID);
    const request = this.transcriba.import(selectedSource, this.foreignID);

    this.watchRequestState(request);

    request.then(
      () => this.notifier.notify(new Notification('request.success', ['success'])),
      (err) => console.log('import error', err)
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
