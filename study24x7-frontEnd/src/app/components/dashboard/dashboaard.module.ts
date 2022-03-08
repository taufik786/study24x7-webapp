import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { PostsComponent } from './posts/posts.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { SinglePostComponent } from './single-post/single-post.component';
import { LeftPanelComponent } from './left-panel/left-panel.component';
import { RightPanelComponent } from './right-panel/right-panel.component';
import { PostFooterComponent } from './posts/post-footer/post-footer.component';
import { PostHeaderComponent } from './posts/post-header/post-header.component';
import { PostSingleComponent } from './posts/post-single/post-single.component';
import { PostPopupComponet } from './posts/post-popup/post-popup.component';

@NgModule({
  declarations: [
    DashboardComponent,
    PostsComponent,
    SinglePostComponent,
    LeftPanelComponent,
    RightPanelComponent,
    PostFooterComponent,
    PostHeaderComponent,
    PostSingleComponent,
    PostPopupComponet,
  ],
  imports: [CommonModule, DashboardRoutingModule, FormsModule, RouterModule],
  exports: [DashboardComponent],
})
export class DashboardModule {}
