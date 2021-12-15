import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { HomeAllComponent } from './components/home-all/home-all.component';
import { HomeComponent } from './home/home.component';
import { TestComponent } from './test/test.component';

const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'home/all', component: HomeAllComponent, canActivate: [AuthGuard]},
  { path: 'test', component: TestComponent, canActivate: [AuthGuard]},
  // { path: 'home', loadChildren: () => import('./components/home-all/home-all.module').then(m => m.HomeAllModule) },
  // { path: '**', redirectTo: '/' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabledBlocking'
})],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
