import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { AppComponent } from '../../app.component';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  name;
  // photo;
  email;
  password;
  passwordConfirm;
  @Output() userCredentials = new EventEmitter();

  constructor(private http: HttpClient,
    private authService: AuthService,
    private appComponent: AppComponent,
    private router: Router) { }

  ngOnInit() {
  }

  createAccount(form) {
    // let user = new FormData();
    // user.append('name' , form.value.name);
    // user.append('photo' , form.value.name);
    // user.append('email' , form.value.email);
    // user.append('password' , form.value.password);
    // user.append('passwordConfirm' , form.value.passwordConfirm);

    let user = {
      name: form.value.name,
      email: form.value.email,
      password: form.value.password,
      passwordConfirm: form.value.passwordConfirm
    };

    this.authService.signup(user)
  //     .subscribe(res => {
  //       if (res.status === "success") {
  //         this.appComponent.createAlertComponent("success", "User created successfully!");
  //         let user = {
  //           name: res.data.user.name,
  //           photo: res.data.user.photo,
  //           role: res.data.user.role
  //         };
  //         this.authService.setToken(res.token);
  //         this.appComponent.switchButtons();
  //         this.userCredentials.emit(user);
  //         this.router.navigate(['/tour-list']);
  //       }
  //     },
  //       err => {
  //         console.log(err);
  //         this.appComponent.createAlertComponent("error", err.error.message);
  //       });
  }

}
