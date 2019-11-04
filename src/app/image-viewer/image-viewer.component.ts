import { Component, OnChanges, Input, SimpleChanges } from '@angular/core';

import { BackendHelper } from '../utilities/backend-helper';
import { ImageViewerService } from './image-viewer.service';


@Component({
  selector:    'tr-image-viewer',
  template:
  `
    <tr-tile-viewer *ngIf="url && zoomSteps" [maxZoomLevel]="zoomSteps" [url]="url"></tr-tile-viewer>
  `,
  styleUrls: []
})
export class ImageViewerComponent implements OnChanges {

  @Input() objectId: any;
  zoomSteps: number;
  url: string;

  constructor(
    private backend: BackendHelper,
    private viewerService: ImageViewerService
  ) {}

  ngOnChanges(changes: SimpleChanges) {
    this.viewerService.loadNumOfZoomLevels(this.objectId).then(
      numOfZooms => {
        this.zoomSteps = numOfZooms - 1;
        this.url = this.backend.unAuthUrl('TranscribaObjects/' + this.objectId + '/tiles/{z}/{x}/{y}');
      },
      err => console.log(err)
    );
  }

}
