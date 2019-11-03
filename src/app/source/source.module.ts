import { NgModule }       from '@angular/core';

// components
import { SourceComponent } from './source.component';
import { SourceDetailsComponent } from './source-details.component';

// modules
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { RouterModule }   from '@angular/router';
import { I18nModule } from '../i18n/i18n.module';
import { UtilityModule } from '../utilities/utility.module';
import { AuthModule } from '../loopback-auth/auth.module';
import { GadgetModule } from '../gadgets/gadget.module';
import { HttpModule } from '@angular/http';

// services
import { SourceService } from './source.service';

// routing
import { sourceRouting } from './source.routing';

@NgModule({
    declarations: [
      SourceComponent,
      SourceDetailsComponent
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
      sourceRouting
    ],
    exports: [SourceComponent, SourceDetailsComponent],
    bootstrap:    [],
    providers: [
      SourceService
    ]
})
export class SourceModule {}
