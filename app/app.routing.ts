import { Routes, RouterModule } from '@angular/router';

//general components
import { DashboardComponent } from './dashboard.component';
import { ExampleComponent } from './example.component';

//error handling components
import { PageNotFoundComponent } from './page-not-found.component';
import { AuthorizationRequiredComponent } from './authorization-required.component';

//to be deleted
import { TranscriptionEditorComponent } from './transcriba/editor/transcription-editor.component';


import { AdminGuardService } from './loopback-auth/admin-guard.service';

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
    path: 'example',
    component: ExampleComponent
  },
  {
    path: 'transcribe',
    component: TranscriptionEditorComponent
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
