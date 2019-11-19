import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment'
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TourService {

  server_base_url = `${environment.server_base_url}/tours`;

  constructor(private http: HttpClient) { }

  getTours(): Observable<any> {
    let server_url = this.server_base_url;
    return this.http.get<any>(server_url);
  }

  getTour(param): Observable<any> {
    console.log( param);
    let server_url = `${this.server_base_url}/${param}`;
    console.log(server_url);
    return this.http.get<any>(server_url);
  }
}
