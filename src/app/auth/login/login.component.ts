import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

import { AuthService } from 'src/app/services/auth.service';
// import { AppComponent } from 'src/app/app.component';
import { GlobalsService } from '../../services/globals.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email: String;
  password: String;
  // private userCredentials = new Subject();

  // @Output() userCredentials = new EventEmitter();

  constructor(private authService: AuthService,
    private router: Router,
    private cookieService: CookieService,
    // private appComponent: AppComponent,
    private globalService: GlobalsService) { }

  ngOnInit() {
  }

  // getUserCredentials() {
  //   return this.userCredentials.asObservable();
  // }

  authenticate(form) {
    let user = {
      email: form.value.email,
      password: form.value.password
    };

    this.authService.login(user);
  //     .subscribe(res => {
  //       if (res.status === "success") {
  //         let user = {
  //           name: res.data.user.name,
  //           photo: res.data.user.photo,
  //           role: res.data.user.role
  //         };
  //         this.authService.setToken(res.token);
  //         // this.authService.setRole(res.data.user.role);
  //         // this.globalService.setUserCredentials(user.name, user.photo, user.role);
  //         // this.globalService.user = {
  //         //   user: user.name,
  //         //   photo: user.photo,
  //         //   role: user.role
  //         // };
  //         this.appComponent.switchButtons();
  //         this.appComponent.createAlertComponent('success', 'User logged in successfully!');
  //         // console.log(user);
  //         // this.userCredentials.emit(user);
  //         this.userCredentials.next(user);
  //         this.router.navigate(['tour-list']);
  //       }
  //     },
  //       err => {
  //         console.log(err.error.message);
  //         this.appComponent.createAlertComponent('error', err.error.message);
  //       });
  }
}
