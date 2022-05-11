import { ComponentsModule } from './../../../shared/components/components.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PollsConsumerPageRoutingModule } from './polls-consumer-routing.module';

import { PollsConsumerPage } from './polls-consumer.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    PollsConsumerPageRoutingModule
  ],
  declarations: [PollsConsumerPage]
})
export class PollsConsumerPageModule {}
