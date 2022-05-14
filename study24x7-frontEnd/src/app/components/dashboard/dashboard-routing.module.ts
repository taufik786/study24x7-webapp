import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { SinglePostComponent } from './single-post/single-post.component';

const routes: Routes = [
  { path: 'home/all', component: DashboardComponent },
  { path: 'post/:id/:post', component: SinglePostComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
