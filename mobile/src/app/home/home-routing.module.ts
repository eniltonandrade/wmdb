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
  }
]
@NgModule({
      imports: [RouterModule.forChild(routes)],
      exports: [RouterModule],
    })
export class HomePageRoutingModule { }
