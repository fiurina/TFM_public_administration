import { ComponentsModule } from './../../../../shared/components/components.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PollsCreationPageRoutingModule } from './polls-creation-routing.module';

import { PollsCreationPage } from './polls-creation.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    PollsCreationPageRoutingModule
  ],
  declarations: [PollsCreationPage]
})
export class PollsCreationPageModule {}
