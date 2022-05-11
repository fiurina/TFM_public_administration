import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PollsDetailPage } from './polls-detail.page';

const routes: Routes = [
  {
    path: '',
    component: PollsDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PollsDetailPageRoutingModule {}
