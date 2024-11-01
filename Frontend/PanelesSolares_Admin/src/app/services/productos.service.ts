import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {
  constructor(private httpClient: HttpClient) { }

  getProductos() {
    return this.httpClient.get('http://127.0.0.1:8000/productos/todos');
  }

  getProducto(id: number) {
    return this.httpClient.get('http://127.0.0.1:8000/productos/uno/' + id);
  }

  createProducto(producto: any) {
    return this.httpClient.post('http://127.0.0.1:8000/productos/crear', producto);
  }

  actualizarProducto(producto: any) {
    // console.log(producto);
    return this.httpClient.put('http://127.0.0.1:8000/productos/actualizar', producto);
  }

  borrarProducto(producto: number) {
    return this.httpClient.delete('http://127.0.0.1:8000/productos/eliminar/' + producto);
  }
}
