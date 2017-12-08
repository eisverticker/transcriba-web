import {
  Component,
  OnInit,
  Inject,
  Input
} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import { InfoPage } from '../info-page';

import { InfoPageService } from '../info-page.service';

@Component({
  selector: 'tr-info-dialog',
  templateUrl: './info-dialog.component.html',
  styleUrls: ['./info-dialog.component.scss']
})
export class InfoDialogComponent implements OnInit {
  infoPage: InfoPage;
  isError = false;

  constructor(
    private pageService: InfoPageService,
    public dialogRef: MatDialogRef<InfoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onUserAcknowledgement(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
    this.pageService.loadOneByName(this.data.infoPageName).then(
      (page) => this.infoPage = page,
      (err) => {
        console.log("info page not found");
        this.isError = true;
      }
    )
  }

}
