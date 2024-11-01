import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PublicacionService {

constructor(private httpClient: HttpClient) { }

  getPublicaciones() {
    return this.httpClient.get('http://127.0.0.1:8000/publicaciones/todas');
  }

  getPublicacion(id: number) {
    return this.httpClient.get('http://127.0.0.1:8000/publicaciones/una/' + id);
  }

  createPublicacion(publicacion: any) {
    return this.httpClient.post('http://127.0.0.1:8000/publicaciones/crear', publicacion);
  }

  actualizarPublicacion(publicacion: any) {
    return this.httpClient.put('http://127.0.0.1:8000/publicaciones/actualizar', publicacion);
  }

  borrarPublicacion(publicacion: number) {
    return this.httpClient.delete('http://127.0.0.1:8000/publicaciones/eliminar/' + publicacion);
  }
}
