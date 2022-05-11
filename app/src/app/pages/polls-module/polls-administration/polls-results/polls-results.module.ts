import { ComponentsModule } from './../../../../shared/components/components.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgChartsModule } from 'ng2-charts';

import { IonicModule } from '@ionic/angular';

import { PollsResultsPageRoutingModule } from './polls-results-routing.module';

import { PollsResultsPage } from './polls-results.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    PollsResultsPageRoutingModule,
    NgChartsModule,
  ],
  declarations: [PollsResultsPage]
})
export class PollsResultsPageModule {}
