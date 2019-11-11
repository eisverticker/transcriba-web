import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// general components
import { SourceEditorComponent } from './source-editor/source-editor.component';
import { SourceComponent } from './source/source.component';

// guards
import { AdminGuard } from '../loopback-auth/admin.guard';

const routes: Routes = [
  {
    path: 'sources/:id',
    component: SourceEditorComponent,
    canActivate: [AdminGuard]
  },
  {
    path: 'sources',
    component: SourceComponent,
    canActivate: [AdminGuard]
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
export class SourceRoutingModule {}
