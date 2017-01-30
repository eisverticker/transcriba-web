import { Component, OnInit, Input, ElementRef, ViewChild, HostListener} from '@angular/core';

import * as L from 'leaflet';

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

  constructor(){}


  ngAfterViewInit() {
    this.fitViewPort();
    this.showViewer();
  }

  private fitViewPort(){
    let rect = this.container.nativeElement.getBoundingClientRect();
    let viewPortHeight = window.innerHeight;
    this.container.nativeElement.style.height = (viewPortHeight-rect.top-35) + "px";
  }

  private showViewer(){

    let viewer = L.map("tileViewer",  {
      crs: L.CRS.Simple,
      attributionControl: false
    });

    var A = viewer.unproject([0, 0], 0);
    var C = viewer.unproject([256, 256], 0);

    viewer.fitBounds(L.latLngBounds(A,C), {});

    let tileLayerOptions = {
      minZoom: 0,
      maxZoom: this.maxZoomLevel+1,
      maxNativeZoom: this.maxZoomLevel,
      bounds: L.latLngBounds(A,C)
    };

    L.tileLayer(
      this.url,
      tileLayerOptions
    )
    .addTo(viewer);
  }


}
