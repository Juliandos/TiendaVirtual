import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ModuloService {

  constructor(private httpClient: HttpClient) { }

  getModulos() {
    return this.httpClient.get('http://127.0.0.1:8000/modulos/todos');
  }
  getModulo(id: number) {
    return this.httpClient.get('http://127.0.0.1:8000/modulos/uno/' + id);
  }
  createModulo(modulo: any) {
    return this.httpClient.post('http://127.0.0.1:8000/modulos/crear', modulo);
  }
  actualizarModulo(modulo: any) {
    return this.httpClient.put('http://127.0.0.1:8000/modulos/actualizar', modulo);
  }
  borrarModulo(modulo: number) {
    return this.httpClient.delete('http://127.0.0.1:8000/modulos/eliminar/'+ modulo);
  }
}
