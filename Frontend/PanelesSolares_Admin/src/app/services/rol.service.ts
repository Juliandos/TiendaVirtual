import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RolService {

  constructor(private httpClient: HttpClient) { }

  getRoles() {
    return this.httpClient.get('http://127.0.0.1:8000/roles/todos');
  }

  getRol(id: number) {
    return this.httpClient.get('http://127.0.0.1:8000/roles/uno/' + id);
  }

  createRol(rol: any) {
    return this.httpClient.post('http://127.0.0.1:8000/roles/crear', rol);
  }

  actualizarRol(rol: any) {
    return this.httpClient.put('http://127.0.0.1:8000/roles/actualizar', rol);
  }

  borrarRol(rol: number) {
    return this.httpClient.delete('http://127.0.0.1:8000/roles/eliminar/' + rol);
  }
}
