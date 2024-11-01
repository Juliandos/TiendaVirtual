import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';

import { jwtDecode } from 'jwt-decode';

import { Observable } from 'rxjs';
// import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(/*private authService: AuthService, */ private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
      
    const token = localStorage.getItem('access_token');

    if (token) {
      try {
        // Decodifica el token
        const decodedToken = jwtDecode(token);

        // Verifica la estructura del token
        if (token.split('.').length !== 3) {
          throw new Error('Token inválido');
        }

        // Verifica la validez temporal del token
        const now = Date.now() / 1000;
        // console.log('now', now);
        // console.log('exp', decodedToken.exp);

        if (decodedToken.exp && decodedToken.exp < now) {
          throw new Error('El token ha expirado');
        }

        // Aquí puedes agregar más verificaciones según tus necesidades, como verificar la firma, el emisor, el destinatario, etc.

        return true; // Si todas las verificaciones son exitosas, el token es válido
      } catch (error) {
        console.error('Error al validar el token:', error);
        return this.router.parseUrl('/login');
      }
    } else {
      return this.router.parseUrl('/login');
    }
  }
}
