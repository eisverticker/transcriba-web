import {
  Component,
  Input,
  OnChanges,
  SimpleChanges
} from '@angular/core';

import { TranscribaService } from '../transcriba.service';

class Item {
  public id: string;
  public username: string;
  public createdAt: string;
  public published: boolean;
  public approved: boolean;
}

@Component({
  selector: 'tr-revision-history',
  templateUrl: './revision-history.component.html',
  styleUrls: ['./revision-history.component.scss']
})
export class RevisionHistoryComponent implements OnChanges {
  @Input() objectId: any;
  items: Array<Item>;

  constructor(
    private transcriba: TranscribaService
  ) {}

  ngOnChanges(changes: SimpleChanges) {
    this.transcriba.loadChronic(this.objectId).then(
      chronic => {
        this.items = chronic;
      },
      err => console.log('failed to load chronic', err)
    );
  }
}
