import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

import { AuthService } from 'src/app/services/auth.service';
import { AppComponent } from 'src/app/app.component';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email: String;
  password: String;
  @Output() userCredentials = new EventEmitter();

  constructor(private authService: AuthService,
    private router: Router,
    private cookieService: CookieService,
    private appComponent: AppComponent) { }

  ngOnInit() {
  }

  authenticate(form) {
    let user = {
      email: form.value.email,
      password: form.value.password
    };

    this.authService.login(user)
      .subscribe(res => {
        if (res.status === "success") {
          let user = {
            name: res.data.user.name,
            photo: res.data.user.photo,
            role: res.data.user.role
          };
          this.authService.setToken(res.token);
          this.appComponent.switchButtons();
          this.appComponent.createAlertComponent('success', 'User logged in successfully!');
          // console.log(user);
          this.userCredentials.emit(user);
          this.router.navigate(['tour-list']);
        }
      },
        err => {
          console.log(err.error.message);
          this.appComponent.createAlertComponent('error', err.error.message);
        });
  }
}
