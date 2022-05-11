import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PollsConsumerPage } from './polls-consumer.page';

const routes: Routes = [
  {
    path: '',
    component: PollsConsumerPage
  },
  {
    path: 'detail/:id',
    loadChildren: () => import('./polls-detail/polls-detail.module').then( m => m.PollsDetailPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PollsConsumerPageRoutingModule {}
