import { NgModule }       from '@angular/core';

//components
import { InfoPageComponent } from './info-page.component';
import { InfoPageViewerComponent } from './info-page-viewer.component';
import { InfoPageEditComponent } from './info-page-edit.component';
import { InfoPageManagementComponent } from './info-page-management.component';

//pipes
import { MarkdownPipe } from './markdown.pipe';

//modules
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { Routes, RouterModule }   from '@angular/router';
import { I18nModule } from '../i18n/i18n.module';
import { UtilityModule } from '../utilities/utility.module';
import { AuthModule } from '../loopback-auth/auth.module';
import { GadgetModule } from '../gadgets/gadget.module';
import { HttpModule } from '@angular/http';

//services
import { InfoPageService } from './info-page.service';

//routing
import { infoPageRouting } from './info-page.routing';

@NgModule({
    declarations: [
      InfoPageComponent,
      InfoPageViewerComponent,
      InfoPageEditComponent,
      InfoPageManagementComponent,
      MarkdownPipe
    ],
    imports:      [
      BrowserModule,
      FormsModule,
      I18nModule,
      HttpModule,
      UtilityModule,
      AuthModule,
      RouterModule,
      GadgetModule,
      infoPageRouting
    ],
    exports: [InfoPageComponent, InfoPageEditComponent, InfoPageManagementComponent, InfoPageViewerComponent],
    bootstrap:    [],
    providers: [
      InfoPageService
    ]
})
export class InfoPageModule {}
