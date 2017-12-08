import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// general components
import { DashboardComponent } from './transcriba-dedicated/dashboard/dashboard.component';

// error handling components
import { PageNotFoundComponent } from './transcriba-dedicated/page-not-found/page-not-found.component';
import { AuthorizationRequiredComponent } from './transcriba-dedicated/authorization-required/authorization-required.component';

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

@NgModule({
  imports: [
    RouterModule.forRoot(
      routes,
      { enableTracing: true } // <-- debugging purposes only
    )
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {}
