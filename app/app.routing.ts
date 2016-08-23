import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './dashboard.component';
import { ExampleComponent } from './example.component';
import { PageNotFoundComponent } from './page-not-found.component';
import { AuthorizationRequiredComponent } from './authorization-required.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent
  },
  {
    path: 'example',
    component: ExampleComponent
  },
  {
    path: '403',
    component: AuthorizationRequiredComponent
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];


export const appRoutingProviders: any[] = [

];

export const routing = RouterModule.forRoot(routes);
