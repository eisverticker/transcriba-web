import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// components
import { BusyWidgetComponent } from './busy-widget/busy-widget.component';
import { ImportFormComponent } from './import-form/import-form.component';
import { ObjectDetailComponent } from './object-detail/object-detail.component';
import { OverviewComponent } from './overview/overview.component';
import { RevisionHistoryComponent } from './revision-history/revision-history.component';
import { TranscriptionViewerComponent } from './transcription-viewer/transcription-viewer.component';
import { VotingSuggestionComponent } from './voting-suggestion/voting-suggestion.component';
import { ExplorerComponent } from './explorer/explorer.component';
import { TutorialComponent } from './tutorial/tutorial.component';

// guards
import { EmployeeGuard } from '../loopback-auth/employee.guard';


const routes: Routes = [
  {
    path: 'explore',
    component: ExplorerComponent,
    data: {
      mode: 'object'
    }
  },
  /*{
    path: 'explore/objects',
    component: ExplorerComponent,
    data: {
      mode: "object"
    }
  },
  {
    path: 'explore/collection/:id',
    component: ExplorerComponent,
    data: {
      mode: "insideCollection"
    }
  },*/
  {
    path: 'import',
    component: ImportFormComponent,
    canActivate: [EmployeeGuard]
  },
  {
    path: 'tutorial',
    component: TutorialComponent
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

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class TranscribaRoutingModule {}
