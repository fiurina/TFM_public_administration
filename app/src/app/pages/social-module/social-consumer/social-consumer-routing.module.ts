import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SocialConsumerPage } from './social-consumer.page';

const routes: Routes = [
  {
    path: '',
    component: SocialConsumerPage
  },
  {
    path: 'check/:id',
    loadChildren: () => import('./social-check/social-check.module').then( m => m.SocialCheckPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SocialConsumerPageRoutingModule {}
