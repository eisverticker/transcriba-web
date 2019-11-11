import {
  Component,
  Input,
  ElementRef,
  ViewChild,
  HostListener,
  AfterViewInit
} from '@angular/core';

import {
  map,
  CRS,
  tileLayer,
  latLngBounds
} from 'leaflet';

@Component({
  selector: 'll-tile-viewer',
  templateUrl: './tile-viewer.component.html',
  styleUrls: ['./tile-viewer.component.scss']
})
export class TileViewerComponent implements AfterViewInit {
  @Input() url: string;
  @Input() maxZoomLevel: number;
  @ViewChild('container') container: ElementRef;

  @HostListener('window:resize', ['$event'])
  onResize($event) {
    this.fitViewPort();
  }

  ngAfterViewInit() {
    this.fitViewPort();
    this.initViewer();
  }

  constructor() { }

  private fitViewPort() {
    const rect = this.container.nativeElement.getBoundingClientRect();
    const viewPortHeight = window.innerHeight;
    this.container.nativeElement.style.height = (viewPortHeight - rect.top - 35) + 'px';
  }

  private initViewer() {
    const viewer = map('tileViewer',  {
      crs: CRS.Simple,
      attributionControl: false
    });

    const A = viewer.unproject([0, 0], 0);
    const C = viewer.unproject([256, 256], 0);

    viewer.fitBounds(latLngBounds(A, C), {});

    const tileLayerOptions = {
      minZoom: 0,
      maxZoom: this.maxZoomLevel + 1,
      maxNativeZoom: this.maxZoomLevel,
      bounds: latLngBounds(A, C),
      updateWhenZooming: false
    };

    tileLayer(
      this.url,
      tileLayerOptions
    )
    .addTo(viewer);

  }

}
