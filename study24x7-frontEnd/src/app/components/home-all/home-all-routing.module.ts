import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeAllComponent } from './home-all.component';

const routes: Routes = [
  // { path: 'all', component: HomeAllComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeAllRoutingModule { }
