import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoriasService {

  constructor(private httpClient: HttpClient) { }

  getCategorias() {
    return this.httpClient.get(`${environment.apiUrl}/categorias/todas`);
  }

  getCategoria(id: number) {
    return this.httpClient.get(`${environment.apiUrl}/categorias/una/` + id);
  }

  createCategoria(categoria: any) {
    return this.httpClient.post(`${environment.apiUrl}/categorias/crear`, categoria);
  }

  actualizarCategoria(categoria: any) {
    return this.httpClient.put(`${environment.apiUrl}/categorias/actualizar`, categoria);
  }

  borrarCategoria(categoria: number) {
    return this.httpClient.delete(`${environment.apiUrl}/categorias/eliminar/` + categoria);
  }

  // getPermisos(id: number): any {
  //   // return this.httpClient.delete(`${environment.apiUrl}/categorias/eliminar/` + categoria);
  // }
}
