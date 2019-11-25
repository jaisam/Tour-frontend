import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { environment } from '../../environments/environment';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
// import { AppComponent } from '../app.component';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  server_base_url = `${environment.server_base_url}/user`;
  user = {
    name: "",
    email: "",
    photo: "",
    role: "",
    _id: ""
  };
  private userCredentials = new BehaviorSubject(this.user);



  constructor(private http: HttpClient,
    private router: Router,
    private cookieService: CookieService,
    private toastr: ToastrService
    // private appComponent: AppComponent
  ) { }

  getUserCredentials() {
    return this.userCredentials.asObservable();
  }

  getToken() {
    return this.cookieService.get('jwt');
  }

  setToken(token) {
    this.cookieService.set('jwt', token, 1, '/'); // Expiry set to 1 day . For 1h = 1/24. 
  }

  deleteToken() {
    this.cookieService.delete('jwt', '/');
  }

  setUser(userInput) {
    this.user = { ...userInput };
    this.userCredentials.next(this.user);
  }

  signup(userInput) {
    let server_url = this.server_base_url + '/signup';
    this.http.post<any>(server_url, userInput)
      .subscribe(res => {
        if (res.token) {
          this.setUser(res.data.user);
          this.setToken(res.token);
          this.toastr.success('User signup successful', '', {
            positionClass: 'toast-top-center',
            timeOut: 3000
          });
          this.router.navigate(['/tour-list']);
        }
      },
        err => {
          this.toastr.error(err.error.message, '', {
            positionClass: 'toast-top-center',
            timeOut: 3000
          });
        });
  }

  login(userInput) {
    let server_url = this.server_base_url + '/login';
    this.http.post<any>(server_url, userInput)
      .subscribe(res => {
        if (res.token) {
          this.setUser(res.data.user);
          this.setToken(res.token);
          this.toastr.success('User logged in successfully!', '', {
            positionClass: 'toast-top-center',
            timeOut: 3000
          });
          this.router.navigate(['/tour-list']);
        }
      },
        err => {
          // console.log(err.error.message);
          this.toastr.error(err.error.message, '', {
            positionClass: 'toast-top-center',
            timeOut: 3000
          });
        });
  }

  logout() {
    this.deleteToken();
    this.user = {
      name: "",
      email: "",
      photo: "",
      role: "",
      _id: ""
    };
    this.userCredentials.next(this.user);
    this.router.navigate(['/']);
  }

  getUser() {
    let server_url = this.server_base_url + '/me';
    this.http.get<any>(server_url)
      .subscribe(res => {
        this.setUser(res.data.data);
      },
        err => {
          // console.log(err.error.message);
          this.toastr.error(err.error.message, '', {
            positionClass: 'toast-top-center',
            timeOut: 3000
          });
        });
  }

  updateUserData(user): Observable<any> {
    let server_url = this.server_base_url + '/updateMe'
    return this.http.patch<any>(server_url, user);
  }

  updatePassword(user): Observable<any> {
    let server_url = this.server_base_url + '/updateMyPassword';
    return this.http.patch<any>(server_url, user);
  }


}
