import { NgModule } from '@angular/core';

// components
import { TileViewerComponent } from './tile-viewer.component';

// modules
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { GadgetModule } from '../gadgets/gadget.module';

// services

// routing


@NgModule({
    declarations: [
      TileViewerComponent
    ],
    imports:      [
      BrowserModule,
      FormsModule,
      GadgetModule
    ],
    exports: [TileViewerComponent],
    bootstrap:    [],
    providers: []
})
export class LeafletModule {}
