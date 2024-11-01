import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OlvidoContrasenaService {

  constructor(private httpClient: HttpClient) { }

  getemial(email: any) {
    console.log(email);
    
    return this.httpClient.post('http://127.0.0.1:8000/olvido_contrasena/emailbackground', email);
  }
}
