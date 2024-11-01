import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ImagenService {

  constructor(private httpClient: HttpClient) { }

  getImagenes() {
    return this.httpClient.get(`${environment.apiUrl}/imagenes/todas`);
  }

  getImagen(id: number) {
    return this.httpClient.get(`${environment.apiUrl}/imagenes/una/` + id);
  }

  createImagen(imagen: any) {
    return this.httpClient.post(`${environment.apiUrl}/imagenes/crear`, imagen);
  }

  actualizarImagen(imagen: any) {
    return this.httpClient.put(`${environment.apiUrl}/imagenes/actualizar`, imagen);
  }

  borrarImagen(imagen: number) {
    return this.httpClient.delete(`${environment.apiUrl}/imagenes/eliminar/` + imagen);
  }
}
