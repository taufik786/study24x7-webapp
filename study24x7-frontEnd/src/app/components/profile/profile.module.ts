import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile.component';
import { PpComponent } from './pp/pp.component';
import { TttComponent } from './ttt/ttt.component';


@NgModule({
  declarations: [
    ProfileComponent,
    PpComponent,
    TttComponent
  ],
  imports: [
    CommonModule,
    ProfileRoutingModule
  ]
})
export class ProfileModule { }
