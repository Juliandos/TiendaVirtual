import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PermisosService } from '../../../services/permisos.service';
import { RolPermisosService } from '../../../services/rol-permisos.service';

import {
  ColumnMode,
  DatatableComponent,
} from '@swimlane/ngx-datatable';
import { Router } from '@angular/router';
import { Permiso } from 'src/app/models/Permiso.enum';

@Component({
  selector: 'app-permisos-crud',
  templateUrl: './permisos-crud.component.html',
  styleUrls: ['./permisos-crud.component.scss']
})
export class PermisosCrudComponent implements OnInit{
  @ViewChild(DatatableComponent) mydatatable: DatatableComponent | undefined;

  formulario: FormGroup;

  ColumnMode = ColumnMode;

  constructor(
    private fb: FormBuilder,
    private RolPermisosService: RolPermisosService,
    private PermisosService: PermisosService,
    private router: Router

  ) {

    const item = localStorage.getItem('logged');
    if (item == 'false') {
      this.router.navigateByUrl('/login');
    }
    
    this.formulario = this.fb.group({
      id: [0],
      r: [false, Validators.required],
      w: [false, Validators.required],
      u: [false, Validators.required],
      d: [false, Validators.required],
      rol: ['', Validators.required],
      modulo_id: ['', Validators.required]
    });
  }

  columns = [
    { prop: 'id' },
    { prop: 'r'},
    { prop: 'w'},
    { prop: 'u'},
    { prop: 'd'},
    { prop: 'rol'},
    { modulo_id: 0}
  ];

  permisos_CRUD: Array<any> = [];
  permiso: any = {};
  tempPermisos: Array<any> = [];

  roles: Array<any> = [];
  tempRoles: Array<any> = [];

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
  r: Boolean = false;
  w: Boolean = false;
  u: Boolean = false;
  d: Boolean = false;
  rol: Array<any> = [];
  modulo_id: Array<any> = [];
  modulo_id_acciones: Number = 0;

  agregar: Boolean = false;
  titulo_model: String = '';

  permisos: any = {}

  todosPermisos() {
    this.PermisosService.getPermisos().subscribe(
      (response: any) => {
        this.tempPermisos = response;
        for (let i = 0; i < this.tempPermisos.length; i++) {
          if (i >= 0) {
            this.tempPermisos[i].acciones = this.botones;
            this.tempPermisos = [...this.tempPermisos];
          }
        }  
        this.permisos_CRUD = response;
        this.permisos_CRUD = [...this.permisos_CRUD];
        this.permisosAcciones();
      },
      (error) => {
        console.log(error);
      }
    );
  }

  permisosAcciones(){
    const modulo: any = localStorage.getItem('persona_email')

    this.RolPermisosService.obtenerPermisos('permisos', modulo).subscribe(
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

  getModuloNombre(id: any): string {
    const servicioTipo = this.modulo_id.find((item: { id: any; }) => item.id === id);
    return servicioTipo ? servicioTipo.nombre : '';
  }

  ngOnInit() {
    this.todosPermisos();
  }

  accionesClick(cell: any, rowIndex: any, item: any) {
    switch (item) {
      case 'Leer':// Creo que va a ser mejor quitarlo
        this.l = true;
        this.a = false;
        this.b = false;
        this.titulo_model = 'Datos Permiso';
        this.id = this.permisos_CRUD[rowIndex].id;
        this.r = this.permisos_CRUD[rowIndex].r;
        this.w = this.permisos_CRUD[rowIndex].w;
        this.u = this.permisos_CRUD[rowIndex].u;
        this.d = this.permisos_CRUD[rowIndex].d;
        this.rol = this.permisos_CRUD[rowIndex].rol;
        this.modulo_id_acciones = this.permisos_CRUD[rowIndex].modulo_id;
        break;
      case 'Actualizar':
        this.l = false;
        this.a = true;
        this.b = false;
        this.titulo_model = 'Actualizar Permiso';
        this.formulario.controls['id'].setValue(this.permisos_CRUD[rowIndex].id);
        this.formulario.controls['r'].setValue(this.permisos_CRUD[rowIndex].r);
        this.formulario.controls['w'].setValue(this.permisos_CRUD[rowIndex].w);
        this.formulario.controls['u'].setValue(this.permisos_CRUD[rowIndex].u);
        this.formulario.controls['d'].setValue(this.permisos_CRUD[rowIndex].d);
        this.formulario.controls['modulo_id'].setValue(this.permisos_CRUD[rowIndex].modulo_id);
        break;
      case 'Borrar':
        this.l = false;
        this.a = false;
        this.b = true;
        this.titulo_model = 'Borrar Permiso';
        this.id = this.permisos_CRUD[rowIndex].id;
        break;
      case false:
        this.agregar = true;
        this.titulo_model = 'Agregar Permiso';
        break;
      default:
        break;
    }
  }

  addTipo() {
    
    this.permiso.r = this.formulario.get('r')?.value;
    this.permiso.w = this.formulario.get('w')?.value;
    this.permiso.u = this.formulario.get('u')?.value;
    this.permiso.d = this.formulario.get('d')?.value;
    this.permiso.modulo_id = this.formulario.get('modulo_id')?.value;
    // console.log(this.permiso);
    
    this.PermisosService.createPermiso(this.permiso).subscribe(
      (response: any) => {
        this.agregar = false; 
        this.permiso = {};
        this.formulario.reset();
        this.todosPermisos();
      },
      (error) => {
        console.log(error);
      }
    );
  }

  updateServicioTipo() {
    this.permiso.id = this.formulario.get('id')?.value;
    this.permiso.r = this.formulario.get('r')?.value;
    this.permiso.w = this.formulario.get('w')?.value;
    this.permiso.u = this.formulario.get('u')?.value;
    this.permiso.d = this.formulario.get('d')?.value;
    this.permiso.modulo_id = this.formulario.get('modulo_id')?.value;
    console.log(this.permiso);
    this.PermisosService.actualizarPermiso(this.permiso).subscribe(
      (response: any) => {
        this.permiso = {};
        this.todosPermisos();
        this.formulario.reset();
        this.a = false
      },
      (error) => {
        console.log(error);
      }
    );
  }

  deleteTipo(id: Number) {
    this.permiso.id = id;
    this.PermisosService.borrarPermiso(this.permiso.id).subscribe(
      (response: any) => {
        this.todosPermisos();
        this.permiso = {};
        this.b = false
      },
      (error) => {
        console.log(error);
      }
    );
  }

  updateFilter(event: any): void {
    const val = event.target.value.toLowerCase();
    const filteredData = this.tempPermisos.filter((row) => {
      return (
        this.getModuloNombre(row.modulo_id).toLowerCase().indexOf(val) !== -1 
      );
    });
    this.permisos_CRUD = filteredData;
    this.permisos_CRUD = [...this.permisos_CRUD];
  }
}
