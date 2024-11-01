import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DetalleVentaService {

  constructor(private httpClient: HttpClient) { }

  getDetalles() {
    return this.httpClient.get(`${environment.apiUrl}/detalle_ventas/todos`);
  }

  // getContacto(id: number) {
  //   return this.httpClient.get(`${environment.apiUrl}/contactos/uno/` + id);
  // }

  createDetalle(detalle: any) {
    return this.httpClient.post(`${environment.apiUrl}/detalle_ventas/crear`, detalle);
  }

  actualizarDetalles(detalle: any) {
    return this.httpClient.put(`${environment.apiUrl}/detalle_ventas/actualizar/` + detalle.servicio_venta_id + `/` + detalle.producto_id, detalle);
  }

  borrarDetalle(detalle1: any, detalle2: any) {
    return this.httpClient.delete(`${environment.apiUrl}/detalle_ventas/eliminar/` + detalle1 + `/` + detalle2);
  }
}
