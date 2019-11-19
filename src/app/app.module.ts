import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TourCardComponent } from './components/tour-card/tour-card.component';
import { TourDetailsComponent } from './components/tour-details/tour-details.component';
import { MonthYearFormatPipe } from './pipes/month-year-format.pipe';
import { TourListComponent } from './components/tour-list/tour-list.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { CookieService } from 'ngx-cookie-service';

@NgModule({
  declarations: [
    AppComponent,
    TourCardComponent,
    TourDetailsComponent,
    MonthYearFormatPipe,
    TourListComponent,
    LoginComponent,
    SignupComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
