import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { PersonasService } from '../../../services/personas.service';
import { RolPermisosService } from '../../../services/rol-permisos.service';
import { LoginService } from '../../../services/login.service';
import {
  ColumnMode,
  DatatableComponent
} from '@swimlane/ngx-datatable';
import { Router } from '@angular/router';
import { Permiso } from 'src/app/models/Permiso.enum';

@Component({
  selector: 'app-persona-crud',
  templateUrl: './persona-crud.component.html',
  styleUrls: ['./persona-crud.component.scss']
})
export class PersonaCrudComponent implements OnInit {
  @ViewChild(DatatableComponent) mydatatable: DatatableComponent | undefined;

  formulario: FormGroup;

  ColumnMode = ColumnMode;

  constructor(
    private fb: FormBuilder,
    private PersonasService: PersonasService,
    private LoginService: LoginService,
    private RolPermisosService: RolPermisosService,
    private router: Router

  ) {

    const item = localStorage.getItem('logged');
    if (item == 'false') {
      this.router.navigateByUrl('/login');
    }

    this.formulario = this.fb.group({
      id: [0],
      nombre: ['', Validators.required],
      telefono: [0, Validators.required],
      email: ['', Validators.required],
      contrasena: ['', [Validators.required, this.validarContrasena]],
      salario: [0, Validators.required],
      direccion: ['', Validators.required],
      token: ['', Validators.required],
      status: [0, Validators.required],
    });
  }

  columns = [
    { prop: 'id' },
    { prop: 'nombre'},
    { prop: 'telefono'},
    { prop: 'email'},
    { prop: 'contrasena'},
    { prop: 'salario'},
    { prop: 'direccion'},
    { prop: 'token'},
    { prop: 'status'},
    { prop: 'acciones'}
  ];

  users: Array<any> = [];
  user: any = {};
  tempusers: Array<any> = [];

  permisosEnum = Permiso;
  botones = [
    {
      nombre: 'Leer',
      permiso: this.permisosEnum.Leer
    },
    {
      nombre: 'Actualizar',
      permiso: this.permisosEnum.Actualizar
    },
    {
      nombre: 'Borrar',
      permiso: this.permisosEnum.Borrar
    },
  ];

  l: Boolean = false;
  a: Boolean = false;
  b: Boolean = false;

  id: Number = 0;
  nombre: String = '';
  telefono: String = '';
  email: String = '';
  contrasena: String = '';
  salario: Number = 0;
  direccion: String = '';
  token: String = '';
  status: Number = 0;

  agregar: Boolean = false;
  titulo_model: String = '';
  alertrepeat = document.getElementsByClassName('none')
  repeatuser = ''

  permisos: any = {}

  visibleRepetido: boolean = false;
  visibleFallo: boolean = false;
  position: string = "middle-center";

  todasPersonas() {
    this.PersonasService.getPersonas().subscribe(
      (response: any) => {
        this.tempusers = response;
        for (let i = 0; i < this.tempusers.length; i++) {
          if (i >= 0) {
            this.tempusers[i].acciones = this.botones;
            this.tempusers = [...this.tempusers];
          }
        }

        this.users = response;
        this.users = [...this.users];
        this.permisosAcciones()
      },
      (error) => {
        console.log(error);
      }
    );

  }

  permisosAcciones(){
    const modulo: any = localStorage.getItem('persona_email')

    this.RolPermisosService.obtenerPermisos('persona', modulo).subscribe(
      (response: any) => {
        if (response.r) this.permisos.r = response.r
        if (response.w) this.permisos.w = response.w
        if (response.u) this.permisos.u = response.u
        if (response.d) this.permisos.d = response.d
      },
      (error) => {
        console.error('Error checking permissions:', error);
      }
    )
  }

  ngOnInit() {
    this.todasPersonas();
  }

  validarContrasena(control: AbstractControl): { [key: string]: boolean } | null {
    const regex = /^(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{6,}$/;
    
    if (!regex.test(control.value)) {
      return { 'contrasenaInvalida': true };
    }
    
    return null;
  }

  accionesClick(cell: any, rowIndex: any, item: any) {
    switch (item) {
      case 'Leer':
        this.l = true;
        this.a = false;
        this.b = false;
        this.titulo_model = 'Datos user';
        this.id = this.users[rowIndex].id;
        this.nombre = this.users[rowIndex].nombre;
        this.telefono = this.users[rowIndex].telefono;
        this.email = this.users[rowIndex].email;
        this.contrasena = this.users[rowIndex].contrasena;
        this.salario = this.users[rowIndex].salario;
        this.direccion = this.users[rowIndex].direccion;
        this.token = this.users[rowIndex].token;
        this.status = this.users[rowIndex].status;
        break;
      case 'Actualizar':
        this.l = false;
        this.a = true;
        this.b = false;
        this.titulo_model = 'Actualizar user';
        this.formulario.controls['id'].setValue(this.users[rowIndex].id);
        this.formulario.controls['nombre'].setValue(this.users[rowIndex].nombre);
        this.formulario.controls['telefono'].setValue(this.users[rowIndex].telefono);
        this.formulario.controls['email'].setValue(this.users[rowIndex].email);
        this.formulario.controls['contrasena'].setValue(this.users[rowIndex].contrasena);
        this.formulario.controls['salario'].setValue(this.users[rowIndex].salario);
        this.formulario.controls['direccion'].setValue(this.users[rowIndex].direccion);
        this.formulario.controls['token'].setValue(this.users[rowIndex].token);
        this.formulario.controls['status'].setValue(this.users[rowIndex].status);

        break;
      case 'Borrar':
        this.l = false;
        this.a = false;
        this.b = true;
        this.titulo_model = 'Borrar user';
        this.id = this.users[rowIndex].id;
        break;
      case false:
        this.agregar = true;
        this.titulo_model = 'Agregar user';
        break;
      default:
        break;
    }
  }

  addPersona() {
    this.user.nombre = this.formulario.get('nombre')?.value;
    this.user.telefono = this.formulario.get('telefono')?.value;
    this.user.email = this.formulario.get('email')?.value;
    this.user.contrasena = this.formulario.get('contrasena')?.value;
    this.user.salario = this.formulario.get('salario')?.value;
    this.user.direccion = this.formulario.get('direccion')?.value;
    this.user.token = this.formulario.get('token')?.value;
    this.user.status = this.formulario.get('status')?.value;
    
    this.LoginService.verify_email(this.user['email']).subscribe(
      (response: any) => {
        
        if (Object.keys(response).length > 1) {
          this.repeatuser = this.user['email']
          const repeatelement = this.alertrepeat[1] as HTMLElement
          repeatelement.classList.remove('none');
          setTimeout(() => {
            repeatelement.classList.add('none');
          }, 3000);
        }else{
          if (this.formulario.get('contrasena')?.errors) {
            const repeatelement = this.alertrepeat[2] as HTMLElement
            repeatelement.classList.remove('none');
            setTimeout(() => {
              repeatelement.classList.add('none');
            }, 3000);
          }else{
            this.LoginService.hashed_password(this.user.contrasena).subscribe(
              (response: any) => {
                this.user.contrasena = response
                this.PersonasService.createPersona(this.user).subscribe(
                  (response: any) => {
                    this.agregar = false; // Agregar mensaje confirmación por 2s, tarea
                    this.user = {};
                    this.formulario.reset();
                    this.todasPersonas();
                  },
                  (error) => {
                    console.log(error);
                  }
                );
              },
              (error) => {
                console.log(error);
              }
            )
          }
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  updatePersona() {
    let personaNombre = {nombre: ''}
    let nombrePersona = ''
    let actualiza = true;
    this.user.id = this.formulario.get('id')?.value;
    this.user.nombre = this.formulario.get('nombre')?.value;
    personaNombre = this.users.find(user => user.nombre === this.user.nombre); 
    if (personaNombre) nombrePersona = personaNombre.nombre
    this.user.telefono = this.formulario.get('telefono')?.value;
    this.user.email = this.formulario.get('email')?.value;
    this.user.contrasena = this.formulario.get('contrasena')?.value;
    this.user.salario = this.formulario.get('salario')?.value;
    this.user.direccion = this.formulario.get('direccion')?.value;
    this.user.token = this.formulario.get('token')?.value;
    this.user.status = this.formulario.get('status')?.value;
    
    this.users.forEach(e => {
      if (e.nombre == nombrePersona && nombrePersona != this.nombre) {
        actualiza = false
        this.visibleRepetido = !this.visibleRepetido
        setTimeout(() => {
          this.todasPersonas();
        }, 3000);
        }
    });
    console.log(actualiza);
    
    // this.LoginService.hashed_password(this.user.contrasena).subscribe(
    //   (response: any) => {
    //     this.user.contrasena = response
    //     this.PersonasService.actualizarPersona(this.user).subscribe(
    //       (response: any) => {
    //         this.user = {};
    //         this.todasPersonas();
    //         this.a = !this.a;
    //       },
    //       (error) => {
    //         console.log(error);
    //       }
    //     );
    //   },
    //   (error) => {
    //     console.log(error);
    //   }
    // )
  }

  deletePersona(id: Number) {
    this.user.id = id;
    this.PersonasService.borrarPersona(this.user.id).subscribe(
      (response: any) => {
        this.todasPersonas();
        this.b = !this.b
      },
      (error) => {
        console.log(error);
      }
    );
  }

  updateFilter(event: any): void {
    const val = event.target.value.toLowerCase();
    // Filtra los datos de acuerdo con la cadenvala
    const filteredData = this.tempusers.filter((row) => {
      return (
        row.nombre.toLowerCase().indexOf(val) !== -1 ||
        row.telefono.toString().indexOf(val) !== -1 ||
        row.email.toLowerCase().indexOf(val) !== -1 ||
        row.contrasena.toLowerCase().indexOf(val) !== -1 ||
        row.salario.toString().indexOf(val) !== -1 ||
        row.direccion.toLowerCase().indexOf(val) !== -1 ||
        row.token.toLowerCase().indexOf(val) !== -1 ||
        row.status.toString().indexOf(val) !== -1 
      );
    });
    // Restablece el offset de la tabla para mostrar los resultados desde el principio
    this.users = filteredData;
    this.users = [...this.users];

    // this.mydatatable.offset = 0;
  }
}
