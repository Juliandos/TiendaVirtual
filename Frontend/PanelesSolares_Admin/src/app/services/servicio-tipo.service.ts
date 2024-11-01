import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ServicioTipoService {

  constructor(private httpClient: HttpClient) { }

  getServiciosTipo() {
    return this.httpClient.get('http://127.0.0.1:8000/servicio_tipos/todos');
  }
  createServicioTipo(servicioTipo: any) {
    return this.httpClient.post('http://127.0.0.1:8000/servicio_tipos/crear', servicioTipo);
  }
  actualizarServicioTipo(servicioTipo: any) {
    return this.httpClient.put('http://127.0.0.1:8000/servicio_tipos/actualizar', servicioTipo);
  }
  borrarServicioTipo(servicioTipo: number) {
    return this.httpClient.delete('http://127.0.0.1:8000/servicio_tipos/eliminar/'+ servicioTipo);
  }
}
