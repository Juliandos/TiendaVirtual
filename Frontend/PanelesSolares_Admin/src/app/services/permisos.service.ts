import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PermisosService {

  constructor(private httpClient: HttpClient) { }

  getPermisos() {
    return this.httpClient.get('http://127.0.0.1:8000/permisos/todos');
  }
  createPermiso(Permiso: any) {
    return this.httpClient.post('http://127.0.0.1:8000/permisos/crear', Permiso);
  }
  actualizarPermiso(Permisos: any) {
    return this.httpClient.put('http://127.0.0.1:8000/permisos/actualizar', Permisos);
  }
  borrarPermiso(Permisos: number) {
    return this.httpClient.delete('http://127.0.0.1:8000/permisos/eliminar/'+ Permisos);
  }
  getPermiso(Permiso: number) {
    return this.httpClient.get('http://127.0.0.1:8000/permisos/uno/' + Permiso);
  }
}
