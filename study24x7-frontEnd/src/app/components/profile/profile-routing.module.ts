import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PpComponent } from './pp/pp.component';
import { ProfileComponent } from './profile.component';
import { TttComponent } from './ttt/ttt.component';

const routes: Routes = [
  { path: '', component: ProfileComponent },
  { path: 'pp', component: PpComponent, },
  { path: 'ttt', component: TttComponent, },
  { path: '**', redirectTo: '/' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }
