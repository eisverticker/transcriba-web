import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// general components
import { SourceDetailsComponent } from './source-details/source-details.component';
import { SourceComponent } from './source/source.component';

// guards
import { AdminGuard } from '../loopback-auth/admin.guard';

const routes: Routes = [
  {
    path: 'sources/:id',
    component: SourceDetailsComponent,
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
