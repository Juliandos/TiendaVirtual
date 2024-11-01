import { Component, OnInit, ElementRef, ViewChild  } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { LoginService } from '../../../services/login.service';
import { PersonasService } from '../../../services/personas.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit{

  // @ViewChild('repeatuser') miElementoRef!: ElementRef;

  formulario: FormGroup;

  constructor(
    private fb: FormBuilder,
    private LoginService: LoginService,
    private PersonasService: PersonasService,
    private router: Router
  ) {

    this.formulario = this.fb.group({
      nombre: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      contrasena1: ['', [Validators.required, this.validarContrasena]],
      contrasena2: ['', Validators.required],
      telefono: [0, Validators.required],
      direccion: ['', Validators.required],
    });
  }

  nombre: String = '';
  email: String = '';
  contrasena1: String = '';
  contrasena2: String = '';
  direccion: String = '';
  telefono: Number = 0;
  user: any = {};
  alertrepeat = document.getElementsByClassName('none')
  repeatuser = ''
  
  ngOnInit() {
  }
  
  validarContrasena(control: AbstractControl): { [key: string]: boolean } | null {
    const regex = /^(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{6,}$/;
    
    if (!regex.test(control.value)) {
      return { 'contrasenaInvalida': true };
    }
    
    return null;
  }

  register(){
    this.user.nombre = this.formulario.get('nombre')?.value;
    this.user.telefono = this.formulario.get('telefono')?.value;
    this.user.email = this.formulario.get('email')?.value;
    this.user.contrasena = this.formulario.get('contrasena1')?.value;
    // this.user.contrasena1 = this.formulario.get('contrasena2')?.value;
    this.user.salario = 10;
    this.user.direccion = this.formulario.get('direccion')?.value;
    this.user.token = '';
    this.user.status = true;
    
    this.LoginService.verify_email(this.user['email']).subscribe(
      (response: any) => {
        
        if (Object.keys(response).length > 1) {
          this.repeatuser = this.user['email']
          const repeatelement = this.alertrepeat[0] as HTMLElement
          repeatelement.classList.remove('none');
          setTimeout(() => {
            repeatelement.classList.add('none');
          }, 3000);
        }else{
          if (this.user.contrasena == this.formulario.get('contrasena2')?.value) {
            
            if (this.formulario.get('contrasena1')?.errors) {
              const repeatelement = this.alertrepeat[2] as HTMLElement
              repeatelement.classList.remove('none');
              setTimeout(() => {
                repeatelement.classList.add('none');
              }, 3000);
            }else{

              this.LoginService.hashed_password(this.user.contrasena).subscribe(
                (response: any) => {
                  this.user.contrasena = response
                  // console.log(this.user);
                  this.PersonasService.createPersona(this.user).subscribe(
                    (response: any) => {
                      console.log(response);
                    },
                    (error) => {
                      console.log(error);
                    }
                  )
                },
                (error) => {
                  console.log(error);
                }
              )
            }
          }else{
            const repeatelement = this.alertrepeat[1] as HTMLElement
            repeatelement.classList.remove('none');
            setTimeout(() => {
              repeatelement.classList.add('none');
            }, 3000);
          }
          
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

}
