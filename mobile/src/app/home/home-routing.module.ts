import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomePage } from './home.page';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
  },
  {
    path: 'movie-list',
    loadChildren: () => import('../pages/movie-list/movie-list.module').then(m => m.MovieListPageModule),
  },
  {
    path: 'movie-details/:id',
    loadChildren: () => import('../pages/movie-details/movie-details.module').then(m => m.MovieDetailsPageModule),
  }
]
@NgModule({
      imports: [RouterModule.forChild(routes)],
      exports: [RouterModule],
    })
export class HomePageRoutingModule { }
