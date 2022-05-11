import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SocialAdministrationPage } from './social-administration.page';

const routes: Routes = [
  {
    path: '',
    component: SocialAdministrationPage
  },
  {
    path: 'creation',
    loadChildren: () => import('./social-creation/social-creation.module').then( m => m.SocialCreationPageModule)
  },
  {
    path: 'detail/:id',
    loadChildren: () => import('./social-detail/social-detail.module').then( m => m.SocialDetailPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SocialAdministrationPageRoutingModule {}
