import { SocialListComponent } from './social-list/social-list.component';
import { PollsListComponent } from './polls-list/polls-list.component';

import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

// Components
import { HeaderComponent } from './header/header.component';

@NgModule({
        imports: [
                CommonModule,
                IonicModule,
                FormsModule,
        ],
        declarations: [
                HeaderComponent,
                PollsListComponent,
                SocialListComponent,
        ],
        exports: [
                HeaderComponent,
                PollsListComponent,
                SocialListComponent,
        ]
})
export class ComponentsModule { }
