import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SocialDetailPage } from './social-detail.page';

const routes: Routes = [
  {
    path: '',
    component: SocialDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SocialDetailPageRoutingModule {}
