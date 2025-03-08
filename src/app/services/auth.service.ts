import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticate = new BehaviorSubject<boolean>(this.hasToken())
  isLoggedIn$ = this.isAuthenticate.asObservable()

  constructor() { }

  private hasToken(): boolean {
    return !!localStorage.getItem('token'); // ✅ Verifica si hay token guardado
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem('token'); // Verifica si hay un token almacenado
    return !!token; // Devuelve true si hay un token, false si no
  }

  login(token: string , user:any) {
    localStorage.setItem('token', token); // Guarda el token
    localStorage.setItem('user', JSON.stringify(user))
    this.isAuthenticate.next(true)
  }

  getUserStorage(){
    const userString = localStorage.getItem('user');
    const user = userString ? JSON.parse(userString) : null;
    return user
  }

  getTokenstorage(): string {
    return localStorage.getItem('token') || '';
  }

  logout() {
    localStorage.removeItem('token'); // Elimina el token al cerrar sesión
    localStorage.removeItem('user');
    this.isAuthenticate.next(false)
  }
  checkLoginStatus() {
    const token = localStorage.getItem('token');
    this.isAuthenticate.next(!!token); // 👈 Verifica si hay token guardado
  }
}
