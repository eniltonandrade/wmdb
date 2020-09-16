import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomePageRoutingModule } from './home-routing.module';

import { NgxGaugeModule } from 'ngx-gauge';

import { HomePage } from './home.page';

import { ChartsModule } from 'ng2-charts';
import { MovieListPageModule } from '../pages/movie-list/movie-list.module';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    NgxGaugeModule,
    ChartsModule,
    MovieListPageModule
  ],
  declarations: [HomePage]
})
export class HomePageModule {}
