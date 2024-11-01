import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private httpClient: HttpClient) { }

  getLogin() {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${'adf'}`
    });

  return this.httpClient.get(`${environment.apiUrl}/login/users/me`, { headers });
  }

  createLogin(usuario: any) {
    const formData = new FormData();
    formData.append('username', usuario.usuario);
    formData.append('password', usuario.password);

    // Configurar cabeceras para indicar que se envía form-data
    // const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');

    return this.httpClient.post(`${environment.apiUrl}/login/token`, formData);
  }

  verify_token(token: any){
    // Token JWT almacenado en el LocalStorage (asegúrate de tenerlo disponible)
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    // Realiza la solicitud GET a la ruta protegida con los encabezados de autorización
    return this.httpClient.get<any>(`http://127.0.0.1:8000/login/protected`, { headers });
  }

  verify_email(email: any){
    return this.httpClient.get(`${environment.apiUrl}/login/email/` + email);
  }

  hashed_password(password: any){
    return this.httpClient.get(`${environment.apiUrl}/login/hash/` + password);
  }
}
