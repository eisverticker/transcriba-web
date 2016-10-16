import { NgModule } from '@angular/core';

//components
import { DeleteButtonComponent } from './delete-button.component';
import { ResultPieChartComponent } from './result-pie-chart.component';
import { InlineSpinnerComponent } from './inline-spinner.component';
import { PaginationBarComponent } from './pagination-bar.component';
import { SubNavbarComponent } from './sub-navbar.component';
import { FailNotifierComponent } from './fail-notifier.component';

//directives
//import { ChartsModule } from 'ng2-charts/ng2-charts';

//modules
import { BrowserModule  } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { RouterModule } from '@angular/router';
import { I18nModule } from '../i18n/i18n.module';

@NgModule({
    declarations: [
      FailNotifierComponent,
      DeleteButtonComponent,
      ResultPieChartComponent,
      InlineSpinnerComponent,
      PaginationBarComponent,
      SubNavbarComponent
    ],
    imports:      [/*ChartsModule,*/ BrowserModule, FormsModule, I18nModule, RouterModule],
    exports: [
      FailNotifierComponent,
      DeleteButtonComponent,
      ResultPieChartComponent,
      InlineSpinnerComponent,
      PaginationBarComponent,
      SubNavbarComponent
    ],
    bootstrap:    [],
    providers: []
})
export class GadgetModule {}
