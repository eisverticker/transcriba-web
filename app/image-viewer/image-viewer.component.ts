import { Component, OnChanges, Input} from '@angular/core';

import { BackendHelper } from '../utilities/backend-helper';
import { ImageViewerService } from './image-viewer.service';


@Component({
  moduleId:     module.id,
  selector:    'image-viewer',
  template:
  `
    <tile-viewer *ngIf="url && zoomSteps" [maxZoomLevel]="zoomSteps" [url]="url"></tile-viewer>
  `,
  styleUrls: []
})
export class ImageViewerComponent implements OnChanges{

  @Input() objectId: any;
  zoomSteps: number;
  url: string;

  constructor(
    private backend: BackendHelper,
    private viewerService: ImageViewerService
  ){}

  ngOnChanges(){
    this.viewerService.loadNumOfZoomLevels(this.objectId).then(
      numOfZooms => {
        this.zoomSteps = numOfZooms-1;
        this.url = this.backend.unAuthUrl('TranscribaObjects/'+this.objectId+'/tiles/{z}/{x}/{y}');
      },
      err => console.log(err)
    );
  }

}
