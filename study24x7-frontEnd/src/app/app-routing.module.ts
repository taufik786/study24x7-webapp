import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'profile',
    loadChildren: () =>
      import('./components/profile/profile.module').then(
        (m) => m.ProfileModule
      ),
  },
  {
    path: 'home',
    loadChildren: () =>
      import('./components/dashboard/dashboaard.module').then(
        (m) => m.DashboardModule
      ),
    canActivate: [AuthGuard],
  },
  { path: '**', redirectTo: '/' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      initialNavigation: 'enabledBlocking',
    }),
  ],
  exports: [RouterModule],
  providers: [AuthGuard],
})
export class AppRoutingModule {}
