import { NgModule } from '@angular/core';

//components
import { DeleteButtonComponent } from './delete-button.component';
import { ResultPieChartComponent } from './result-pie-chart.component';
import { InlineSpinnerComponent } from './inline-spinner.component';
import { PaginationBarComponent } from './pagination-bar.component';

//directives
import { CHART_DIRECTIVES } from 'ng2-charts/ng2-charts';

//modules
import { BrowserModule  } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { I18nModule } from '../i18n/i18n.module';

@NgModule({
    declarations: [
      DeleteButtonComponent,
      ResultPieChartComponent,
      CHART_DIRECTIVES,
      InlineSpinnerComponent,
      PaginationBarComponent,
    ],
    imports:      [BrowserModule, FormsModule, I18nModule],
    exports: [
      DeleteButtonComponent,
      ResultPieChartComponent,
      CHART_DIRECTIVES,
      InlineSpinnerComponent,
      PaginationBarComponent
    ],
    bootstrap:    [],
    providers: []
})
export class GadgetModule {}
