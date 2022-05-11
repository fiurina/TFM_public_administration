import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SocialCreationPage } from './social-creation.page';

const routes: Routes = [
  {
    path: '',
    component: SocialCreationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SocialCreationPageRoutingModule {}
