import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  server_base_url = `${environment.server_base_url}/user`;

  constructor(private http: HttpClient, private cookieService: CookieService) { }

  getToken() {
    return this.cookieService.get('jwt');
  }

  setToken(token) {
    this.cookieService.set('jwt', token, 1); // Expiry day is set to 1 day
  }

  deleteToken() {
    this.cookieService.delete('jwt', '/');
  }

  createUser(user): Observable<any> {
    let server_url = this.server_base_url + '/signup';
    console.log(server_url);
    return this.http.post<any>(server_url , user);
  }
  login(user): Observable<any> {
    let server_url = this.server_base_url + '/login';
    return this.http.post<any>(server_url, user);
  }

  getUser(): Observable<any> {
    let server_url = this.server_base_url + '/me';
    return this.http.get(server_url);
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
