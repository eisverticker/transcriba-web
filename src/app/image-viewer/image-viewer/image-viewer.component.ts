import {
  Component,
  OnChanges,
  SimpleChanges,
  Input
} from '@angular/core';

import { BackendService } from '../../utility/backend.service';
import { ImageViewerService } from '../image-viewer.service';
import { LoggerService } from '../../utility/logger.service';

@Component({
  selector: 'iv-image-viewer',
  templateUrl: './image-viewer.component.html',
  styleUrls: ['./image-viewer.component.scss']
})
export class ImageViewerComponent implements OnChanges {
  private logger = LoggerService.getCustomLogger('ImageViewerComponent');

  @Input() objectId: any;
  zoomSteps: number;
  url: string;

  constructor(
    private backend: BackendService,
    private viewerService: ImageViewerService
  ) {}

  ngOnChanges(changes: SimpleChanges) {
    this.viewerService.loadNumOfZoomLevels(this.objectId).then(
      numOfZooms => {
        this.zoomSteps = numOfZooms - 1;
        this.url = this.backend.unAuthUrl('TranscribaObjects/' + this.objectId + '/tiles/{z}/{x}/{y}');
      },
      error => this.logger.error(error)
    );
  }

}
