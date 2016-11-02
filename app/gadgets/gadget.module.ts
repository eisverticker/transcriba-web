import { NgModule } from '@angular/core';

//components
import { DeleteButtonComponent } from './delete-button.component';
import { InlineSpinnerComponent } from './inline-spinner.component';
import { PaginationBarComponent } from './pagination-bar.component';
import { SubNavbarComponent } from './sub-navbar.component';
import { FailNotifierComponent } from './fail-notifier.component';
import { GrowingTextareaComponent } from './growing-textarea.component';

//directives

//modules
import { BrowserModule  } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { RouterModule } from '@angular/router';
import { I18nModule } from '../i18n/i18n.module';

@NgModule({
    declarations: [
      FailNotifierComponent,
      DeleteButtonComponent,
      InlineSpinnerComponent,
      PaginationBarComponent,
      SubNavbarComponent,
      GrowingTextareaComponent
    ],
    imports: [BrowserModule, FormsModule, I18nModule, RouterModule],
    exports: [
      FailNotifierComponent,
      DeleteButtonComponent,
      InlineSpinnerComponent,
      PaginationBarComponent,
      SubNavbarComponent,
      GrowingTextareaComponent
    ],
    bootstrap:    [],
    providers: []
})
export class GadgetModule {}
