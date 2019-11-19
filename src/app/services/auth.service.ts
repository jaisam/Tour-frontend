import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  server_base_url = `${environment.server_base_url}/user`;

  constructor(private http: HttpClient) { }

  login(user): Observable<any> {
    let server_url = this.server_base_url + '/login';
    return this.http.post<any>(server_url, user);
  }
}
