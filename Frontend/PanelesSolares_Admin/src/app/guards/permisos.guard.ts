import { CanActivateFn } from '@angular/router';
import { ActivatedRouteSnapshot } from '@angular/router';
import { inject } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { RolPermisosService } from '../services/rol-permisos.service';

export const permisosGuard: CanActivateFn = (route: ActivatedRouteSnapshot): Observable<boolean> => {
  
  const solicitud = inject(RolPermisosService);
  const email: string | null = localStorage.getItem('persona_email');
  const modulo: string | null = route.data["modulo"]
  // console.log(solicitud, email, modulo);
  
  return solicitud.obtenerPermisos(modulo ? modulo : '', email ? email : '').pipe(
    map((response: any) => {
      console.log(response);
      const permiso: boolean = !!response.r; //  convierte el valor de response.someCondition a su equivalente booleano.
      return permiso;
    }),
    catchError((error) => {
      console.log(error);
      return of(false);  // O cualquier otra lógica que determine que la ruta no puede ser activada
    })
  );

};

