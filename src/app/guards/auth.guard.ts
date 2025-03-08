import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service'; // Servicio de autenticación
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean | Observable<boolean> {
    if (this.authService.isAuthenticated()) {
      return true; // Permite el acceso
    } else {
      this.router.navigate(['/users']); // Redirige a login si no está autenticado
      return false;
    }
  }
}