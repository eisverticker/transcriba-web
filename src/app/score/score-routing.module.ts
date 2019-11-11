import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MatCardModule } from '@angular/material';
import { MatToolbarModule } from '@angular/material';

// components
import { HallOfFameComponent } from './hall-of-fame/hall-of-fame.component';

const routes: Routes = [
  {
    path: 'highscore',
    component: HallOfFameComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    // material design
    MatCardModule,
    MatToolbarModule
  ],
  exports: [
    RouterModule
  ]
})
export class ScoreRoutingModule {}
