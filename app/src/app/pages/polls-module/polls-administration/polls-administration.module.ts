import { ComponentsModule } from './../../../shared/components/components.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PollsAdministrationPageRoutingModule } from './polls-administration-routing.module';

import { PollsAdministrationPage } from './polls-administration.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PollsAdministrationPageRoutingModule,
    ComponentsModule,
  ],
  declarations: [PollsAdministrationPage]
})
export class PollsAdministrationPageModule {}
