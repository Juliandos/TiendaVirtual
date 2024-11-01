import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PersonasService } from '../../../services/personas.service';
import { OlvidoContrasenaService } from '../../../services/olvido-contrasena.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit{

  formulario: FormGroup;

  constructor(
    private fb: FormBuilder,
    private PersonasService: PersonasService,
    private OlvidoContrasenaService: OlvidoContrasenaService,
  ) {
    this.formulario = this.fb.group({
      user: ["", Validators.required]
    });
  }

  user: string = "";
  noencontrado = document.getElementsByClassName('none')
  contador: number = 0
  personas: any = {}

  info: any = {
    email: [
      ''
    ]
  };

  ngOnInit(): void {
    this.PersonasService.getPersonas().subscribe(
      (response: any) => {
        this.personas = response
      },
      (error) => {
        console.log(error);
      }
    );
  }

  getuser(){
    this.user = this.formulario.get('user')?.value
    this.info.email = this.user
    // console.log(this.info);
    const mail = {
      "email": [
        `${this.user}`
      ]
    }

    if (this.user == '') {
      const nofound2 = this.noencontrado[1] as HTMLElement
      nofound2.classList.remove('none');
      setTimeout(() => {
        nofound2.classList.add('none');
      }, 3000);
    }else{
      for (const persona of this.personas) {
        if (persona.email === this.user) {
          this.OlvidoContrasenaService.getemial(mail).subscribe(
            (response: any) => {
              console.log(response);
              
            },
            (error) => {
              console.log(error);
            }
          );
        }else{
          this.contador++         
        }
      }
      if (this.personas.length >= this.contador) {
        this.contador = 0;
        const nofound1 = this.noencontrado[0] as HTMLElement
        nofound1.classList.remove('none');
        setTimeout(() => {
          nofound1.classList.add('none');
        }, 3000);
      }
    }
  }
}
