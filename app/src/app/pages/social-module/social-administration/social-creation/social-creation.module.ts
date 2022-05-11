import { ComponentsModule } from './../../../../shared/components/components.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SocialCreationPageRoutingModule } from './social-creation-routing.module';

import { SocialCreationPage } from './social-creation.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    SocialCreationPageRoutingModule
  ],
  declarations: [SocialCreationPage]
})
export class SocialCreationPageModule {}
