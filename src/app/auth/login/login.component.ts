import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

import { AuthService } from 'src/app/services/auth.service';
// import { AppComponent } from 'src/app/app.component';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email: String;
  password: String;

  constructor(private authService: AuthService,
    private router: Router,
    private cookieService: CookieService,
    // private appComponent: AppComponent
    ) { }

  ngOnInit() {
  }

  authenticate(form) {
    let user = {
      email: form.value.email,
      password: form.value.password
    };

    this.authService.login(user);
  }
}
