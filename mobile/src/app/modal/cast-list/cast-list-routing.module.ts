import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CastListPage } from './cast-list.page';

const routes: Routes = [
  {
    path: '',
    component: CastListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CastListPageRoutingModule {}
