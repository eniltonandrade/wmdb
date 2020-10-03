import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CastListPageRoutingModule } from './cast-list-routing.module';

import { CastListPage } from './cast-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CastListPageRoutingModule
  ],
  declarations: [CastListPage]
})
export class CastListPageModule {}
