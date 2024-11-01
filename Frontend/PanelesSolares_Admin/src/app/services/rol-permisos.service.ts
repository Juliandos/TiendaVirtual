import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RolPermisosService {

  constructor(private httpClient: HttpClient) { }

  getDetalles() {
    return this.httpClient.get('http://127.0.0.1:8000/rol_permisos/todos');
  }

  createDetalle(detalle: any) {
    return this.httpClient.post('http://127.0.0.1:8000/rol_permisos/crear', detalle);
  }

  actualizarDetalles(detalle: any) {
    return this.httpClient.put('http://127.0.0.1:8000/rol_permisos/actualizar/' + detalle.servicio_venta_id + '/' + detalle.producto_id, detalle);
  }

  borrarDetalle(detalle1: any, detalle2: any) {
    return this.httpClient.delete('http://127.0.0.1:8000/rol_permisos/eliminar/' + detalle1 + '/' + detalle2);
  }

  obtenerPermisos(modulo: string, email: string) {
    
    const datos = {
      email,
      modulo
    }

      return this.httpClient.post(`http://127.0.0.1:8000/rol_permisos/modulo`, datos);
    }
  }
