import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ContactoService {


  constructor(private httpClient: HttpClient) { }

  getContactos() {
    return this.httpClient.get(`${environment.apiUrl}/contactos/todos`);
  }

  getContacto(id: number) {
    return this.httpClient.get(`${environment.apiUrl}/contactos/uno/${id}`);
  }

  createContacto(contacto: any) {
    return this.httpClient.post(`${environment.apiUrl}/contactos/crear`, contacto);
  }

  actualizarContacto(contacto: any) {
    return this.httpClient.put(`${environment.apiUrl}/contactos/actualizar`, contacto);
    // console.log(contacto);
  }

  borrarContacto(id: number) {
    return this.httpClient.delete(`${environment.apiUrl}/contactos/eliminar/${id}`);
  }
}
