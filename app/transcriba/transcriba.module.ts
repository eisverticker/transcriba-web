import { NgModule }       from '@angular/core';

//general components
import { ImportFormComponent } from './import-form.component';
import { ExplorerComponent } from './explorer.component';
import { ObjectDetailComponent } from './object-detail.component';
import { ImageViewerComponent } from './image-viewer.component';

//pipes

//modules
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { Routes, RouterModule }   from '@angular/router';
import { I18nModule } from '../i18n/i18n.module';
import { UtilityModule } from '../utilities/utility.module';
import { AuthModule } from '../loopback-auth/auth.module';
import { GadgetModule } from '../gadgets/gadget.module';
import { HttpModule } from '@angular/http';
import { SourceModule } from '../source/source.module';
import { DiscussionModule } from '../discussion/discussion.module';
import { ScoreModule } from '../score/score.module';
import { EditorModule } from '../editor/editor.module';
import { ImageViewerModule } from '../image-viewer/image-viewer.module';

//services
import { TranscribaService } from './transcriba.service';

//routing
import { transcribaRouting } from './transcriba.routing';


@NgModule({
    declarations: [
      ImportFormComponent,
      ExplorerComponent,
      ObjectDetailComponent
    ],
    imports:      [
      BrowserModule,
      FormsModule,
      I18nModule,
      HttpModule,
      UtilityModule,
      AuthModule,
      SourceModule,
      RouterModule,
      GadgetModule,
      DiscussionModule,
      transcribaRouting,
      ScoreModule,
      EditorModule,
      ImageViewerModule
    ],
    exports: [ImportFormComponent, ExplorerComponent],
    bootstrap:  [],
    providers: [
      TranscribaService
    ]
})
export class TranscribaModule {}
