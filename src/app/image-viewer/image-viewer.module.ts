import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { ImageViewerComponent } from './image-viewer/image-viewer.component';
import { ImageViewerService } from './image-viewer.service';
import { LeafletModule } from '../leaflet/leaflet.module';
import { LoopbackAuthModule } from '../loopback-auth/loopback-auth.module';
import { UtilityModule } from '../utility/utility.module';


@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    LeafletModule,
    HttpClientModule,
    LoopbackAuthModule,
    UtilityModule
  ],
  exports: [ ImageViewerComponent ],
  declarations: [ ImageViewerComponent ],
  providers: [ ImageViewerService ]
})
export class ImageViewerModule { }
