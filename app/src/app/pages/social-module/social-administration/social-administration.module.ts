import { ComponentsModule } from './../../../shared/components/components.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SocialAdministrationPageRoutingModule } from './social-administration-routing.module';

import { SocialAdministrationPage } from './social-administration.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    SocialAdministrationPageRoutingModule
  ],
  declarations: [SocialAdministrationPage]
})
export class SocialAdministrationPageModule {}
