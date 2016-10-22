import { Component, OnInit, Input, ElementRef, ViewChild} from '@angular/core';

import { latLngBounds, CRS, map, MapOptions, Map, tileLayer, TileLayer, TileLayerOptions } from 'leaflet';

@Component({
  moduleId:     module.id,
  selector:    'tile-viewer',
  template:
  `
    <div id="tileViewer" style="height: 800px; width: 100%;"></div>
  `,
  styleUrls: []
})
export class TileViewerComponent{

  @Input() url: string;
  @Input() maxZoomLevel: number;
  @ViewChild('div') div: ElementRef


  constructor(){}

  ngAfterViewInit() {
    this.showViewer();
  }

  private showViewer(){

    let viewer = map("tileViewer",  {
      crs: CRS.Simple
    });

    var A = viewer.unproject([0, 0], 0);
    var C = viewer.unproject([256, 256], 0);

    viewer.fitBounds(latLngBounds(A,C), {});

    let options = {
      minZoom: 0,
      maxZoom: this.maxZoomLevel+1,
      maxNativeZoom: this.maxZoomLevel,
      bounds: latLngBounds(A,C)
    };

    tileLayer(
      this.url,
      options
    )
    .addTo(viewer);
  }


}
