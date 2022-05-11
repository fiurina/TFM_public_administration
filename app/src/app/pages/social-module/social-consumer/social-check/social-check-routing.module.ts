import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SocialCheckPage } from './social-check.page';

const routes: Routes = [
  {
    path: '',
    component: SocialCheckPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SocialCheckPageRoutingModule {}
