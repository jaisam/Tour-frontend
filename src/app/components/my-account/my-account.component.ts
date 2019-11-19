import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { AppComponent } from 'src/app/app.component';
import { Router } from '@angular/router';


@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.css']
})
export class MyAccountComponent implements OnInit {

  name;
  email;
  photo;
  passwordCurrent;
  password;
  passwordConfirm;

  constructor(private authService: AuthService,
    private appComponent: AppComponent,
    private router: Router) { }

  ngOnInit() {
  }

  updateUserData(userData) {
    let user = {
      name: userData.value.name,
      email: userData.value.email,
      photo: userData.value.photo
    }
    this.authService.updateUserData(user)
      .subscribe(res => {
        if(res.status === "success") {
          // No need to assign new token as only name or email or photo of user is updated.
          // const token = res.token;
          // this.authService.setToken(token);
          this.appComponent.createAlertComponent("success", "User data updated successfully!");
        }
      }, 
      err => {
        console.log(err);
        this.appComponent.createAlertComponent("error" , err.error.message );
      });
  }

  updatePassword(passwordData) {
    let user = {
      passwordCurrent: passwordData.value.passwordCurrent,
      password: passwordData.value.password,
      passwordConfirm: passwordData.value.passwordConfirm
    }
    this.authService.updatePassword(user)
      .subscribe(res => {
        console.log(res);
        if (res.status === "success") {
          // Need to delete old token as password is updated and let user login again to get new token
          this.authService.deleteToken();
          this.appComponent.createAlertComponent("success", "Password updated successfully! Please Login again");
          this.router.navigate(["/login"]);
        }
      },
        err => {
          console.log(err);
          this.appComponent.createAlertComponent("error", err.error.message);
        });
  }
}
