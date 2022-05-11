import { ComponentsModule } from 'src/app/shared/components/components.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SocialDetailPageRoutingModule } from './social-detail-routing.module';

import { SocialDetailPage } from './social-detail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    SocialDetailPageRoutingModule
  ],
  declarations: [SocialDetailPage]
})
export class SocialDetailPageModule {}
