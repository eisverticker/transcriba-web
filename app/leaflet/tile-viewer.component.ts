import { Component, OnInit, Input, ElementRef, ViewChild, HostListener} from '@angular/core';

import { latLngBounds, CRS, map, MapOptions, Map, tileLayer, TileLayer, TileLayerOptions } from 'leaflet';

@Component({
  moduleId:     module.id,
  selector:    'tile-viewer',
  template:
  `
    <div #container id="tileViewer" style="width: 100%;"></div>
  `,
  styleUrls: []
})
export class TileViewerComponent{
  @Input() url: string;
  @Input() maxZoomLevel: number;
  @ViewChild('container') container: ElementRef;
  @HostListener('window:resize', ['$event'])
  onResize($event){
    this.fitViewPort();
  }

  constructor(
      private window: Window
  ){}


  ngAfterViewInit() {
    this.fitViewPort();
    this.showViewer();
  }

  private fitViewPort(){
    let rect = this.container.nativeElement.getBoundingClientRect();
    let viewPortHeight = this.window.innerHeight;
    this.container.nativeElement.style.height = (viewPortHeight-rect.top-35) + "px";
  }

  private showViewer(){

    let viewer = map("tileViewer",  {
      crs: CRS.Simple,
      attributionControl: false
    });

    var A = viewer.unproject([0, 0], 0);
    var C = viewer.unproject([256, 256], 0);

    viewer.fitBounds(latLngBounds(A,C), {});

    let tileLayerOptions = {
      minZoom: 0,
      maxZoom: this.maxZoomLevel+1,
      maxNativeZoom: this.maxZoomLevel,
      bounds: latLngBounds(A,C)
    };

    tileLayer(
      this.url,
      tileLayerOptions
    )
    .addTo(viewer);
  }


}
