import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { I18nModule } from '../i18n/i18n.module';

// Third-Party components
import {
  MatButtonModule,
  MatProgressSpinnerModule,
  MatIconModule,
  MatPaginatorModule
} from '@angular/material';

import { LoadingIndicatorComponent } from './loading-indicator/loading-indicator.component';
import { FailIndicatorComponent } from './fail-indicator/fail-indicator.component';
import { InlineSpinnerComponent } from './inline-spinner/inline-spinner.component';
import { CriticalButtonComponent } from './critical-button/critical-button.component';
import { SubNavBarComponent } from './sub-nav-bar/sub-nav-bar.component';
import { PaginationBarComponent } from './pagination-bar/pagination-bar.component';
import { TimeoutComponent } from './timeout/timeout.component';
import { GrowingTextareaComponent } from './growing-textarea/growing-textarea.component';
import { SimpleDialogComponent } from './simple-dialog/simple-dialog.component';
import { ProgressPillsComponent } from './progress-pills/progress-pills.component';


@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    RouterModule,
    I18nModule,
    MatButtonModule, // delete button component i.a.
    MatIconModule,
    MatProgressSpinnerModule,
    MatPaginatorModule
  ],
  declarations: [
    LoadingIndicatorComponent,
    FailIndicatorComponent,
    InlineSpinnerComponent,
    CriticalButtonComponent,
    SubNavBarComponent,
    PaginationBarComponent,
    TimeoutComponent,
    GrowingTextareaComponent,
    SimpleDialogComponent,
    ProgressPillsComponent
  ],
  exports: [
    LoadingIndicatorComponent,
    FailIndicatorComponent,
    InlineSpinnerComponent,
    CriticalButtonComponent,
    SubNavBarComponent,
    PaginationBarComponent,
    GrowingTextareaComponent,
    SimpleDialogComponent,
    ProgressPillsComponent
  ],
  entryComponents: [
    SimpleDialogComponent
  ]
})
export class TranscribaUiModule { }
