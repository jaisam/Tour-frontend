import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TourDetailsComponent } from './components/tour-details/tour-details.component';
import { TourListComponent } from './components/tour-list/tour-list.component';
import { LoginComponent } from './auth/login/login.component';


const routes: Routes = [
  {path : 'tour-details/:slug' , component : TourDetailsComponent },
  {path : 'tour-list/' , component : TourListComponent },
  {path : 'login' , component : LoginComponent },
  {path : '' ,redirectTo : '/tour-list/' , pathMatch : 'full' },
  {path : '**' , redirectTo : '/tour-list/' , pathMatch : 'full' }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})


export class AppRoutingModule { }
