import { Routes, RouterModule } from '@angular/router';

// general components
import { DashboardComponent } from './dashboard.component';

// error handling components
import { PageNotFoundComponent } from './page-not-found.component';
import { AuthorizationRequiredComponent } from './authorization-required.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: DashboardComponent
  },
  {
    path: '403',
    component: AuthorizationRequiredComponent
  },
  {
    path: '404',
    component: PageNotFoundComponent
  },

  {
    path: '**',
    component: PageNotFoundComponent
  }
];


export const appRoutingProviders: any[] = [

];

export const routing = RouterModule.forRoot(routes);
