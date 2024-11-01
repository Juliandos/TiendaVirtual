import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TipoPagoService {

  constructor(private httpClient: HttpClient) { }

  getTiposPago() {
    return this.httpClient.get('http://127.0.0.1:8000/tipo_pagos/todos');
  }
  createTipoPago(tipo: any) {
    return this.httpClient.post('http://127.0.0.1:8000/tipo_pagos/crear', tipo);
  }
  actualizarTipoPago(tipo: any) {
    // console.log(servicio);
    return this.httpClient.put('http://127.0.0.1:8000/tipo_pagos/actualizar', tipo);
  }
  borrarTipo(tipo: number) {
    return this.httpClient.delete('http://127.0.0.1:8000/tipo_pagos/eliminar/'+ tipo);
  }
}
