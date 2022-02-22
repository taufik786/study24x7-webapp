import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { PostsComponent } from './posts/posts.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard.component';

@NgModule({
  declarations: [ DashboardComponent, PostsComponent],
  imports: [CommonModule,
    DashboardRoutingModule,
    FormsModule,
    RouterModule
  ],
  exports: [DashboardComponent],
})
export class DashboardModule {}
