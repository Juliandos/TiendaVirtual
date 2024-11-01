import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PersonaRolService {

  constructor(private httpClient: HttpClient) { }

  getPerRolUno(persona_id: any) {
    return this.httpClient.get('http://127.0.0.1:8000/persona_roles/uno/' + persona_id);
  }

  getPerRol() {
    return this.httpClient.get('http://127.0.0.1:8000/persona_roles/todos');
  }

  createPerRol(perol: any) {
    return this.httpClient.post('http://127.0.0.1:8000/rol_permisos/crear', perol);
  }

  actualizarPerRol(perol: any) {
    return this.httpClient.put('http://127.0.0.1:8000/persona_roles/actualizar/', perol);
  }

  borrarPerRol(perol1: any, perol2: any) {
    return this.httpClient.delete('http://127.0.0.1:8000/persona_roles/eliminar/' + perol1 + '/' + perol2);
  }
}
