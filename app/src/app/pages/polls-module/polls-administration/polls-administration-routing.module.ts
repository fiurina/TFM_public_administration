import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PollsAdministrationPage } from './polls-administration.page';

const routes: Routes = [
  {
    path: '',
    component: PollsAdministrationPage
  },
  {
    path: 'creation',
    loadChildren: () => import('./polls-creation/polls-creation.module').then( m => m.PollsCreationPageModule)
  },
  {
    path: 'results/:id',
    loadChildren: () => import('./polls-results/polls-results.module').then( m => m.PollsResultsPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PollsAdministrationPageRoutingModule {}
