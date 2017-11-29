import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';

import { TileViewerComponent } from './tile-viewer/tile-viewer.component';

@NgModule({
  imports: [
    CommonModule,
    BrowserModule
  ],
  declarations: [
    TileViewerComponent
  ],
  exports: [
    TileViewerComponent
  ]
})
export class LeafletModule { }
