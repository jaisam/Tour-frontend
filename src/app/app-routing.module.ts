import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TourDetailsComponent } from './components/tour-details/tour-details.component';
import { TourListComponent } from './components/tour-list/tour-list.component';
import { LoginComponent } from './auth/login/login.component';
import { MyAccountComponent } from './components/my-account/my-account.component';
import { SignupComponent } from './auth/signup/signup.component';
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
  { path: 'tour-details/:slug', component: TourDetailsComponent },
  { path: 'tour-list/', component: TourListComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'me', component: MyAccountComponent, canActivate: [AuthGuard] },
  { path: '', redirectTo: '/tour-list/', pathMatch: 'full' },
  { path: '**', redirectTo: '/tour-list/', pathMatch: 'full' }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers : [AuthGuard]
})


export class AppRoutingModule { }
