import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProfileAdministrationPage } from './profile-administration.page';

const routes: Routes = [
  {
    path: '',
    component: ProfileAdministrationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfileAdministrationPageRoutingModule {}
