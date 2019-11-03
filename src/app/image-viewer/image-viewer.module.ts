import { NgModule }       from '@angular/core';

// components
import { ImageViewerComponent } from './image-viewer.component';

// modules
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { AuthModule } from '../loopback-auth/auth.module';
import { LeafletModule } from '../leaflet/leaflet.module';

// services
import { ImageViewerService } from './image-viewer.service';



@NgModule({
    declarations: [
      ImageViewerComponent
    ],
    imports:      [
      BrowserModule,
      FormsModule,
      AuthModule,
      LeafletModule
    ],
    exports: [ImageViewerComponent],
    bootstrap:  [],
    providers: [
      ImageViewerService
    ]
})
export class ImageViewerModule {}
