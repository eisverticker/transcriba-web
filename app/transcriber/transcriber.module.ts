import { NgModule }       from '@angular/core';

//components

//modules
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { Routes, RouterModule }   from '@angular/router';
import { I18nModule } from '../i18n/i18n.module';
import { UtilityModule } from '../utilities/utility.module';
import { AuthModule } from '../loopback-auth/auth.module';
import { GadgetModule } from '../gadgets/gadget.module';
import { HttpModule } from '@angular/http';
import { TranscribaModule } from '../transcriba/transcriba.module';

//services

//routing
import { transcriberRouting } from './transcriber.routing';

@NgModule({
    declarations: [

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
      TranscribaModule,
      transcriberRouting
    ],
    exports: [

    ],
    bootstrap:    [],
    providers: [

    ]
})
export class TranscriberModule {}
