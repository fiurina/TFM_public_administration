import { ComponentsModule } from './../../../../shared/components/components.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SocialCheckPageRoutingModule } from './social-check-routing.module';

import { SocialCheckPage } from './social-check.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    SocialCheckPageRoutingModule
  ],
  declarations: [SocialCheckPage]
})
export class SocialCheckPageModule {}
