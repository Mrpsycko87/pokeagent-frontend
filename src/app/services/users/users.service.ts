import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private apiUrl = environment.APIEndPoint;

  constructor(private http: HttpClient) { }

  login(data:any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/user/login`,data);
  }

  logout(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/logout`);
  }

  signup(data:any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/user/new`,data);
  }

}
