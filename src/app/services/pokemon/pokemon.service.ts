import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  private apiUrl = environment.APIEndPoint;

  constructor(private http: HttpClient,
    private Token: AuthService
  ) { }

  private setHeader() {
    if (!this.Token.isAuthenticated()) {
      return {}
    }

    return {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.Token.getTokenstorage()}`)
    }
  }

  findPokemon(data: any): Observable<any> {
    let x
    data.id ? x = data.id : x = data.name
    return this.http.get<any>(`${this.apiUrl}/pokemon/${x}`, this.setHeader());
  }

  capturePokemon(data: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/pokemon`,data, this.setHeader());
  }

  getPokemonByuser(id: any): Observable<any> {

    return this.http.get<any>(`${this.apiUrl}/pokemon/user/${id}`, this.setHeader());
  }

  updatePokemonByuser(data:any): Observable<any> {

    return this.http.put<any>(`${this.apiUrl}/pokemon/user/${data._id}`, data,this.setHeader());
  }

  deletePokemonByuser(data:any): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/pokemon/user/${data._id}`,this.setHeader());
  }
}
