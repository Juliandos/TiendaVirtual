import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RolPermisosService } from '../../../services/rol-permisos.service';
import { ServicioTipoService } from '../../../services/servicio-tipo.service';
import {
  ColumnMode,
  DatatableComponent,
} from '@swimlane/ngx-datatable';
import { Router } from '@angular/router';
import { Permiso } from 'src/app/models/Permiso.enum';

@Component({
  selector: 'app-servicio-tipo',
  templateUrl: './servicio-tipo.component.html',
  styleUrls: ['./servicio-tipo.component.scss']
})
export class ServicioTipoComponent implements OnInit{
  @ViewChild(DatatableComponent) mydatatable: DatatableComponent | undefined;

  formulario: FormGroup;

  ColumnMode = ColumnMode;

  constructor(
    private fb: FormBuilder,
    private servicioTipoService: ServicioTipoService,
    private RolPermisosService: RolPermisosService,
    private router: Router
  ) {
    const item = localStorage.getItem('logged');
    if (item == 'false') {
      this.router.navigateByUrl('/login');
    }
    this.formulario = this.fb.group({
      id: [0],
      nombre: ['', Validators.required]
    });
  }

  columns = [
    { prop: 'id' },
    { prop: 'nombre'}
  ];

  servicioTipos: Array<any> = [];
  servicioTipo: any = {};
  tempServicioTipos: Array<any> = [];

  servicio_tipo: Array<any> = [];

  tipo_pago: Array<any> = [];

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
  status: Number = 0;

  agregar: Boolean = false;
  titulo_model: String = '';

  permisos: any = {};

  visibleRepetido: boolean = false;
  visibleFallo: boolean = false;
  position: string = "middle-center";

  todosTipos() {
    this.visibleFallo = false
    this.visibleRepetido = false
    this.servicioTipoService.getServiciosTipo().subscribe(
      (response: any) => {
        this.tempServicioTipos = response;
        for (let i = 0; i < this.tempServicioTipos.length; i++) {
          if (i >= 0) {
            this.tempServicioTipos[i].acciones = this.botones;
            this.tempServicioTipos = [...this.tempServicioTipos];
          }
        }
        this.servicioTipos = response;
        this.servicioTipos = [...this.servicioTipos];
        this.permisosAcciones()
      },
      (error) => {
        console.log(error);
      }
    );
  }

  permisosAcciones(){
    const modulo: any = localStorage.getItem('persona_email')

    this.RolPermisosService.obtenerPermisos('servicio_tipo', modulo).subscribe(
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
    this.todosTipos();
  }

  accionesClick(cell: any, rowIndex: any, item: any) {
    switch (item) {
      case 'Leer':
        this.l = true;
        this.a = false;
        this.b = false;
        this.titulo_model = 'Datos Tipo de Servicio';
        this.id = this.servicioTipos[rowIndex].id;
        this.nombre = this.servicioTipos[rowIndex].nombre;
        break;
      case 'Actualizar':
        this.l = false;
        this.a = true;
        this.b = false;
        this.titulo_model = 'Actualizar Tipo de Servicio';
        this.formulario.controls['id'].setValue(this.servicioTipos[rowIndex].id);
        this.formulario.controls['nombre'].setValue(this.servicioTipos[rowIndex].nombre);
        break;
      case 'Borrar':
        this.l = false;
        this.a = false;
        this.b = true;
        this.titulo_model = 'Borrar Tipo de Servicio';
        this.id = this.servicioTipos[rowIndex].id;
        break;
      case false:
        this.agregar = true;
        this.titulo_model = 'Agregar Tipo de Servicio';
        break;
      default:
        break;
    }
  }

  addTipo() {
    let servicioTipoNombre = {}
    this.servicioTipo.nombre = this.formulario.get('nombre')?.value;
    servicioTipoNombre = this.servicioTipos.find((servicioTipo: { nombre: any; }) => servicioTipo.nombre === this.servicioTipo.nombre);
    this.agregar = false;

    if (!servicioTipoNombre) {
      this.servicioTipoService.createServicioTipo(this.servicioTipo).subscribe(
      (response: any) => {
        this.agregar = false; 
        this.servicioTipo = {};
        this.formulario.reset();
        this.todosTipos();
      },
      (error) => {
        console.log(error);
        this.visibleFallo = !this.visibleFallo
        setTimeout(() => {
          this.todosTipos();
        }, 3000);
      });
    }else{
      this.visibleRepetido = !this.visibleRepetido
      setTimeout(() => {
        this.todosTipos();
      }, 3000);
    }
  }

  updateServicioTipo() {
    let tipoNombre = {nombre: ''}
    let nombreTipo = ''
    let actualiza = true;
    this.servicioTipo.id = this.formulario.get('id')?.value;
    this.servicioTipo.nombre = this.formulario.get('nombre')?.value;
    tipoNombre = this.servicioTipos.find(servicioTipo => servicioTipo.nombre === this.servicioTipo.nombre); 
    if (tipoNombre) nombreTipo = tipoNombre.nombre
  
    this.servicioTipos.forEach(e => {
      if (e.nombre == nombreTipo && nombreTipo != this.nombre) {
        actualiza = false
        this.visibleRepetido = !this.visibleRepetido
        setTimeout(() => {
          this.todosTipos();
        }, 3000);
        }
    });

    if (actualiza) {
      this.servicioTipoService.actualizarServicioTipo(this.servicioTipo).subscribe(
        (response: any) => {
          this.servicioTipo = {};
          this.todosTipos();
          this.formulario.reset();
          this.a = false
        },
        (error) => {
          console.log(error);
        }
      );
    }

  }

  deleteTipo(id: Number) {
    this.servicioTipo.id = id;
    this.servicioTipoService.borrarServicioTipo(this.servicioTipo.id).subscribe(
      (response: any) => {
        this.todosTipos();
        this.servicioTipo = {};
        this.b = false
      },
      (error) => {
        console.log(error);
      }
    );
  }

  updateFilter(event: any): void {
    const val = event.target.value.toLowerCase();
    const filteredData = this.tempServicioTipos.filter((row) => {
      return (
        row.nombre.toLowerCase().indexOf(val) !== -1 
      );
    });
    this.servicioTipos = filteredData;
    this.servicioTipos = [...this.servicioTipos];
  }
}
