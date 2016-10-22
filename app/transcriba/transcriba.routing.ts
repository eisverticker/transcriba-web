import { Routes, RouterModule } from '@angular/router';

import { AuthGuardService } from '../loopback-auth/auth-guard.service';
import { AdminGuardService } from '../loopback-auth/admin-guard.service';

import { ExplorerComponent } from './explorer.component';
import { ImportFormComponent } from './import-form.component';

import { ObjectDetailComponent } from './object-detail.component';

//import { AuthGuardService } from './auth-guard.service';

const routes: Routes = [
  {
    path: 'explore',
    component: ExplorerComponent,
    data: {
      type: "collection"
    }
  },
  {
    path: 'explore/objects',
    component: ExplorerComponent,
    data: {
      type: "object"
    }
  },
  {
    path: 'import',
    component: ImportFormComponent,
    canActivate: [AdminGuardService]
  },
  {
    path: 'obj/:id',
    component: ObjectDetailComponent,
    data: {
      mode: 'overview'
    }
  },
  {
    path: 'obj/:id/discussion',
    component: ObjectDetailComponent,
    data: {
      mode: 'discussion'
    }
  },
  {
    path: 'obj/:id/transcribe',
    component: ObjectDetailComponent,
    data: {
      mode: 'transcription'
    }
  },
  {
    path: 'obj/:id/viewer',
    component: ObjectDetailComponent,
    data: {
      mode: 'viewer'
    }
  },
  {
    path: 'obj/:id/meta',
    component: ObjectDetailComponent,
    data: {
      mode: 'meta'
    }
  },
  {
    path: 'obj/:id/chronic',
    component: ObjectDetailComponent,
    data: {
      mode: 'chronic'
    }
  }
];

export const transcribaRouting = RouterModule.forChild(routes);
