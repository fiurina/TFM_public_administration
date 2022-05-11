import { AuthGuard } from './../../shared/guards/auth.guard';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';
import { Roles } from 'src/app/shared/models/roles.constants';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'polls/administration',
        canActivate: [AuthGuard],
        data: {Roles: [Roles.ADMIN]},
        loadChildren: () => import('../polls-module/polls-administration/polls-administration.module').then( m => m.PollsAdministrationPageModule)
      },
      {
        path: 'polls/consumer',
        canActivate: [AuthGuard],
        data: {Roles: [Roles.CITIZEN]},
        loadChildren: () => import('../polls-module/polls-consumer/polls-consumer.module').then( m => m.PollsConsumerPageModule)
      },
      {
        path: 'social/administration',
        canActivate: [AuthGuard],
        data: {Roles: [Roles.ADMIN]},
        loadChildren: () => import('../social-module/social-administration/social-administration.module').then( m => m.SocialAdministrationPageModule)
      },
      {
        path: 'social/consumer',
        canActivate: [AuthGuard],
        data: {Roles: [Roles.CITIZEN]},
        loadChildren: () => import('../social-module/social-consumer/social-consumer.module').then( m => m.SocialConsumerPageModule)
      },
      {
        path: 'profile/administration',
        canActivate: [AuthGuard],
        data: {Roles: [Roles.ADMIN]},
        loadChildren: () => import('../profile-module/profile-administration/profile-administration.module').then( m => m.ProfileAdministrationPageModule)
      },
      {
        path: 'profile/consumer',
        canActivate: [AuthGuard],
        data: {Roles: [Roles.CITIZEN]},
        loadChildren: () => import('../profile-module/profile-consumer/profile-consumer.module').then( m => m.ProfileConsumerPageModule)
      },
      //TODO: Revisar esto
      // {
      //   path: '',
      //   redirectTo: '/tabs/polls',
      //   pathMatch: 'full'
      // }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}
