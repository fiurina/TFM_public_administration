import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PollsResultsPage } from './polls-results.page';

const routes: Routes = [
  {
    path: '',
    component: PollsResultsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PollsResultsPageRoutingModule {}
