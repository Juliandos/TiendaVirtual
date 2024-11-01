import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ContactoService } from '../../../services/contacto.service';
import { RolPermisosService } from '../../../services/rol-permisos.service';
import {
  ColumnMode,
  DatatableComponent,
  NgxDatatableModule,
} from '@swimlane/ngx-datatable';
import { Router } from '@angular/router';
import { Permiso } from '../../../models/Permiso.enum';


@Component({
  selector: 'app-contacto-crud',
  templateUrl: './contacto-crud.component.html',
  styleUrls: ['./contacto-crud.component.scss'],
  // imports: [NgxDatatableModule]
})
export class ContactoCRUDComponent implements OnInit {
  @ViewChild(DatatableComponent) mydatatable: DatatableComponent | undefined;

  formulario: FormGroup;

  ColumnMode = ColumnMode;

  constructor(
    private fb: FormBuilder,
    private contactoService: ContactoService,
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
      email: ['', [Validators.required, Validators.minLength(5)]],
      mensaje: ['', Validators.required],
    });
  }

  contactos: Array<any> = [];
  contacto: any = {};
  tempContactos: Array<any> = [];

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
  email: String = '';
  mensaje: String = '';

  agregar: Boolean = false;
  titulo_model: String = '';
  ejemplo: any;

  contenedorImgcontactos: any = {};
  contenedorImgcontactosActualizada: any = {};

  permisos: any = {}
  rol_id: Array<any> = [];
  rol_modulo_id: Array<any> = [];

  tempPersonasRol: Array<any> = [];
  personasRoles: Array<any> = [];

  visibleRepetido: boolean = false;
  visibleFallo: boolean = false;
  position: string = "middle-center";


  todoscontactos() {
    this.visibleRepetido = false
    this.visibleFallo = false

    this.contactoService.getContactos().subscribe(
      (response: any) => {
        this.tempContactos = response;
        for (let i = 0; i < this.tempContactos.length; i++) {
          if (i >= 0) {
            this.tempContactos[i].acciones = this.botones;
            this.tempContactos = [...this.tempContactos];
          }
        }

        this.contactos = response;
        this.contactos = [...this.contactos];
        this.permisosAcciones();
      },
      (error) => {
        console.log(error);
      }
    );
  }

  ngOnInit() {
    // this.en_linea = true;
    this.todoscontactos();
  }

  permisosAcciones(){

    const modulo: any = localStorage.getItem('persona_email')

    this.RolPermisosService.obtenerPermisos('contacto', modulo).subscribe(
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

  accionesClick(cell: any, rowIndex: any, item: any) {
    switch (item) {
      case 'Leer':
        this.l = true;
        this.a = false;
        this.b = false;
        this.titulo_model = 'Datos Contacto';
        this.id = this.contactos[rowIndex].id;
        this.nombre = this.contactos[rowIndex].nombre;
        this.email = this.contactos[rowIndex].email;
        this.mensaje = this.contactos[rowIndex].mensaje;
        break;
      case 'Actualizar':
        this.l = false;
        this.a = true;
        this.b = false;
        this.titulo_model = 'Actualizar Contacto';
        // this.nombre = this.contactos[rowIndex].nombre;
        this.formulario.controls['id'].setValue(this.contactos[rowIndex].id);
        this.formulario.controls['nombre'].setValue(
          this.contactos[rowIndex].nombre
        );
        this.formulario.controls['email'].setValue(
          this.contactos[rowIndex].email
        );
        this.formulario.controls['mensaje'].setValue(
          this.contactos[rowIndex].mensaje
        );

        break;
      case 'Borrar':
        this.l = false;
        this.a = false;
        this.b = true;
        this.titulo_model = 'Borrar Contacto';
        this.id = this.contactos[rowIndex].id;
        this.nombre = this.contactos[rowIndex].nombre;
        this.email = this.contactos[rowIndex].email;
        this.mensaje = this.contactos[rowIndex].mensaje;
        break;
      case false:
        this.agregar = true;
        this.titulo_model = 'Agregar Contacto';
        console.log(this.agregar);

        break;
      default:
        break;
    }
  }

  addContacto() {
    let contactoNombre = {}
    this.contacto.nombre = this.formulario.get('nombre')?.value;
    contactoNombre = this.contactos.find((contacto: { nombre: any; }) => contacto.nombre === this.contacto.nombre);
    this.contacto.email = this.formulario.get('email')?.value;
    this.contacto.mensaje = this.formulario.get('mensaje')?.value;
    this.agregar = false;

    if (!contactoNombre) {
      this.contactoService.createContacto(this.contacto).subscribe(
        (response: any) => {
          this.agregar = false; //// Agregar mensaje confirmación por 2s, tarea
          this.contacto = {};
          this.formulario.reset();
          this.todoscontactos();
        },
        (error) => {
          console.log(error);
          this.visibleFallo = !this.visibleFallo
          setTimeout(() => {
            this.todoscontactos();
          }, 3000);
        });
      }else{
        this.visibleRepetido = !this.visibleRepetido
        setTimeout(() => {
          this.todoscontactos();
        }, 3000);
      }

  }

  updateContacto() {
    let contactoNombre = {nombre: ''}
    let nombreContacto = ''
    let actualiza = true;
    this.contacto.id = this.formulario.get('id')?.value;
    this.contacto.nombre = this.formulario.get('nombre')?.value;
    contactoNombre = this.contactos.find(categoria => categoria.nombre === this.contacto.nombre); 
      if (contactoNombre) nombreContacto = contactoNombre.nombre
    this.contacto.email = this.formulario.get('email')?.value;
    this.contacto.mensaje = this.formulario.get('mensaje')?.value;

    this.contactos.forEach(e => {
      if (e.nombre == nombreContacto && nombreContacto != this.nombre) {
        actualiza = false
        this.visibleRepetido = !this.visibleRepetido
        setTimeout(() => {
          this.todoscontactos();
        }, 3000);
        }
    });

    if (actualiza) {
      this.contactoService.actualizarContacto(this.contacto).subscribe(
        (response: any) => {
          this.contacto = {};
          this.todoscontactos();
          this.a = !this.a;
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }

  deleteContacto(id: Number) {
    this.contacto.id = id;
    this.contactoService.borrarContacto(this.contacto.id).subscribe(
      (response: any) => {
        this.todoscontactos();
        this.b = !this.b;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  updateFilter(event: any): void {
    const val = event.target.value.toLowerCase();
    // Filtra los datos de acuerdo con la cadenvala
    const filteredData = this.tempContactos.filter((row) => {
      return (
        row.nombre.toLowerCase().indexOf(val) !== -1 ||
        row.email.toLowerCase().indexOf(val) !== -1 ||
        row.mensaje.toLowerCase().indexOf(val) !== -1
      );
    });
    // Restablece el offset de la tabla para mostrar los resultados desde el principio
    this.contactos = filteredData;
    this.contactos = [...this.contactos];

    // this.mydatatable.offset = 0;
  }
}
