import { ComponentsModule } from './../../../../shared/components/components.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PollsDetailPageRoutingModule } from './polls-detail-routing.module';

import { PollsDetailPage } from './polls-detail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    PollsDetailPageRoutingModule
  ],
  declarations: [PollsDetailPage]
})
export class PollsDetailPageModule {}
