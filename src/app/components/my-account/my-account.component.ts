import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { AppComponent } from 'src/app/app.component';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.css']
})
export class MyAccountComponent implements OnInit, OnDestroy {

  name;
  email;
  photo;
  passwordCurrent;
  password;
  passwordConfirm;
  public user = {
    name: "",
    email: "",
    photo: ""
  };
  file;
  private userCredentialsSubscription: Subscription;

  constructor(private authService: AuthService,
    private appComponent: AppComponent,
    private router: Router,
    private toastr: ToastrService) {
  }

  ngOnInit() {

    this.userCredentialsSubscription = this.authService.getUserCredentials()
      .subscribe(res => {
        console.log(res);
        if (res) {
          this.user.email = res.email;
          this.user.name = res.name;
          this.user.photo = res.photo;
        }
        else{
          this.user = {
            name: "",
            email: "",
            photo: ""
          };
        }
      });
  }

  ngOnDestroy() {
    this.userCredentialsSubscription.unsubscribe();
  }

  onFileChanged(event) {
    this.file = event.target.files[0];
  }

  updateUserData(userData) {
    console.log('photo :' , this.file);
    let user = new FormData();
    user.append('name', userData.value.name ? userData.value.name : this.user.name );
    user.append('email', userData.value.email ? userData.value.email : this.user.email );
    user.append('photo', this.file );
    // console.log(user.get('name'));
    console.log(user);
    this.authService.updateUserData(user)
      .subscribe(res => {
        if (res.status === "success") {
          // userData.reset(); // Resetting the input fields
          this.authService.setUser(res.data.user);
          // No need to assign new token as only name or email or photo of user is updated.
          // const token = res.token;
          // this.authService.setToken(token);
          this.toastr.success('User data updated successfully', '', {
            positionClass: 'toast-top-center',
            timeOut: 3000
          });
        }
      },
        err => {
          console.log(err);
          this.toastr.error(err.error.message, '', {
            positionClass: 'toast-top-center',
            timeOut: 3000
          });
          if (err.status === 401) {
            this.authService.logout();
            this.router.navigate(['/login']);
          }
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
          passwordData.reset(); // Resetting the input fields
          // Need to delete old token as password is updated and let user login again to get new token
          this.authService.deleteToken();
          this.toastr.success('Password updated successfully! Please Login again', '', {
            positionClass: 'toast-top-center',
            timeOut: 3000
          });
          this.appComponent.onLogout();
        }
      },
        err => {
          console.log(err.error.message);
          this.toastr.error(err.error.message, '', {
            positionClass: 'toast-top-center',
            timeOut: 3000
          });
        });
  }

}
