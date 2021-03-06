import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MovieListPageRoutingModule } from './movie-list-routing.module';

import { MovieListPage } from './movie-list.page';
import { MovieDetailsPageModule } from '../movie-details/movie-details.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MovieListPageRoutingModule,
    MovieDetailsPageModule
  ],
  declarations: [MovieListPage]
})
export class MovieListPageModule {}
