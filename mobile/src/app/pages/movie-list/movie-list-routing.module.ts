import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MovieListPage } from './movie-list.page';

const routes: Routes = [
  {
    path: '',
    component: MovieListPage
  },
  {
    path: 'movie-details/:id',
    loadChildren: () => import('../movie-details/movie-details.module').then(m => m.MovieDetailsPageModule),
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MovieListPageRoutingModule {}
