import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PersonasService {

  constructor(private httpClient: HttpClient) { }

  login() {
    return this.httpClient.get('http://127.0.0.1:8000/personas/login');
  }

  getPersonas() {
    return this.httpClient.get('http://127.0.0.1:8000/personas/todas');
  }

  getPersona(email: any) {
    return this.httpClient.get('http://127.0.0.1:8000/personas/una/' + email);
  }

  createPersona(persona: any) {
    return this.httpClient.post('http://127.0.0.1:8000/personas/crear', persona);
  }

  actualizarPersona(persona: any) {
    return this.httpClient.put('http://127.0.0.1:8000/personas/actualizar', persona);
  }

  borrarPersona(persona: number) {
    return this.httpClient.delete('http://127.0.0.1:8000/personas/eliminar/' + persona);
  }
}
