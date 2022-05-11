import { ComponentsModule } from './../../../shared/components/components.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProfileAdministrationPageRoutingModule } from './profile-administration-routing.module';

import { ProfileAdministrationPage } from './profile-administration.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    ProfileAdministrationPageRoutingModule
  ],
  declarations: [ProfileAdministrationPage]
})
export class ProfileAdministrationPageModule {}
