import { NgModule }       from '@angular/core';

// components
import { EditorComponent } from './editor.component';
import { RootComponent } from './root.component';
import { TeiElementComponent } from './tei-element.component';
import { TeiContainerComponent } from './tei-container.component';

// pipes

// modules
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { I18nModule } from '../i18n/i18n.module';
import { UtilityModule } from '../utilities/utility.module';
import { GadgetModule } from '../gadgets/gadget.module';
import { ImageViewerModule } from '../image-viewer/image-viewer.module';

// services
import { EditorService } from './editor.service';

// routing



@NgModule({
    declarations: [
      EditorComponent,
      RootComponent,
      TeiElementComponent,
      TeiContainerComponent
    ],
    imports: [
      BrowserModule,
      FormsModule,
      I18nModule,
      UtilityModule,
      GadgetModule,
      ImageViewerModule
    ],
    exports: [EditorComponent],
    bootstrap:  [],
    providers: [
      EditorService
    ]
})
export class EditorModule {}
