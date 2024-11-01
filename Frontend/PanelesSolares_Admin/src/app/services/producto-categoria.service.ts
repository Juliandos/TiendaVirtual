import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductoCategoriaService {

  constructor(private httpClient: HttpClient) { }

  getProCat() {
    return this.httpClient.get('http://127.0.0.1:8000/producto_categorias/todos');
  }

  createProCat(proCat: any) {
    return this.httpClient.post('http://127.0.0.1:8000/producto_categorias/crear', proCat);
  }

  actualizarProCat(proCat: any) {
    return this.httpClient.put('http://127.0.0.1:8000/producto_categorias/actualizar/' + proCat.categoria_id + '/' + proCat.producto_id, proCat);
  }

  borrarProCat(proCat1: any, proCat2: any) {//era al revez
    return this.httpClient.delete('http://127.0.0.1:8000/producto_categorias/eliminar/' + proCat2 + '/' + proCat1);
  }
}
