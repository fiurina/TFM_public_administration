import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SocialConsumerPageRoutingModule } from './social-consumer-routing.module';

import { SocialConsumerPage } from './social-consumer.page';
import { ComponentsModule } from 'src/app/shared/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    SocialConsumerPageRoutingModule
  ],
  declarations: [SocialConsumerPage]
})
export class SocialConsumerPageModule {}
