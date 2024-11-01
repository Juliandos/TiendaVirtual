import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ServicioVentaService {

  constructor(private httpClient: HttpClient) { }

  getServicios() {
    return this.httpClient.get('http://127.0.0.1:8000/facturas/todas');
  }

  // getProducto(id: number) {
  //   return this.httpClient.get('http://127.0.0.1:8000/productos/uno/' + id);
  // }

  createServicio(servicio: any) {
    return this.httpClient.post('http://127.0.0.1:8000/facturas/crear', servicio);
  }

  actualizarServicio(servicio: any) {
    // console.log(servicio);
    return this.httpClient.put('http://127.0.0.1:8000/facturas/actualizar', servicio);
  }

  borrarServicio(servicio: number) {
    return this.httpClient.delete('http://127.0.0.1:8000/facturas/eliminar/'+ servicio);
  }

  
}
