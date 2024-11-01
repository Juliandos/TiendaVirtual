import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../../../services/login.service';
import { Router } from '@angular/router';
export let token: any = [];

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{

  formulario: FormGroup;

  constructor(
    private fb: FormBuilder,
    private LoginService: LoginService,
    private router: Router
  ) {

    this.formulario = this.fb.group({
      username: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  username: String = '';
  password: String = '';
  user: any = [];

  credenciales = document.getElementsByClassName('none')

  ngOnInit() {
  }
  
  login(){
    this.user['usuario'] = this.formulario.controls['username'].value
    this.user['password'] = this.formulario.controls['password'].value
    
    this.LoginService.createLogin(this.user).subscribe(
      (response: any) => {
        token = response
        localStorage.setItem('access_token', JSON.stringify(token.access_token));
        localStorage.setItem('logged', JSON.stringify(true));
        localStorage.setItem('persona_email', this.user['usuario']);

        this.LoginService.verify_token(token.access_token).subscribe(
          (response: any) => {
            this.router.navigateByUrl('/dashboard');
          },
          (error) => {
            const login = this.credenciales[0] as HTMLElement
            login.classList.remove('none');
            setTimeout(() => {
              login.classList.add('none');
            }, 3000);
            console.log(error);
          }
        );
      },
      (error) => {
        const login = this.credenciales[0] as HTMLElement
        login.classList.remove('none');
        setTimeout(() => {
          login.classList.add('none');
        }, 3000);
        console.log(error);
      }
    );
  }

}
