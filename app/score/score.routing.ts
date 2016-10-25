import { Routes, RouterModule } from '@angular/router';

import { HallOfFameComponent } from './hall-of-fame.component';

//import { AuthGuardService } from './auth-guard.service';

const routes: Routes = [
  {
    path: 'highscore',
    component: HallOfFameComponent,
  }
];

export const scoreRouting = RouterModule.forChild(routes);
