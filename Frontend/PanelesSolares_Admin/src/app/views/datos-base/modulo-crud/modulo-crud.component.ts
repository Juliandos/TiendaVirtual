import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RolPermisosService } from '../../../services/rol-permisos.service';
import { ModuloService } from '../../../services/modulo.service';
import {
  ColumnMode,
  DatatableComponent,
} from '@swimlane/ngx-datatable';
import { Router } from '@angular/router';
import { Permiso } from 'src/app/models/Permiso.enum';

@Component({
  selector: 'app-modulo-crud',
  templateUrl: './modulo-crud.component.html',
  styleUrls: ['./modulo-crud.component.scss']
})
export class ModuloCrudComponent  implements OnInit{
  @ViewChild(DatatableComponent) mydatatable: DatatableComponent | undefined;

  formulario: FormGroup;

  ColumnMode = ColumnMode;

  constructor(
    private fb: FormBuilder,
    private RolPermisosService: RolPermisosService,
    private ModuloService: ModuloService,
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

  modulos: Array<any> = [];
  modulo: any = {};
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

  permisos: any = {}

  visibleRepetido: boolean = false;
  visibleFallo: boolean = false;
  position: string = "middle-center";

  todosModulo() {
    this.visibleFallo = false
    this.visibleRepetido = false
    this.ModuloService.getModulos().subscribe(
      (response: any) => {
        this.tempServicioTipos = response;
        for (let i = 0; i < this.tempServicioTipos.length; i++) {
          if (i >= 0) {
            this.tempServicioTipos[i].acciones = this.botones;
            this.tempServicioTipos = [...this.tempServicioTipos];
          }
        }
        this.modulos = response;
        this.modulos = [...this.modulos];
        this.permisosAcciones()
      },
      (error) => {
        console.log(error);
      }
    );
  }

  permisosAcciones(){
    const modulo: any = localStorage.getItem('persona_email')

    this.RolPermisosService.obtenerPermisos('modulo', modulo).subscribe(
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
    this.todosModulo();
  }

  accionesClick(cell: any, rowIndex: any, item: any) {
    switch (item) {
      case 'Leer':
        this.l = true;
        this.a = false;
        this.b = false;
        this.titulo_model = 'Datos Tipo de Servicio';
        this.id = this.modulos[rowIndex].id;
        this.nombre = this.modulos[rowIndex].nombre;
        break;
      case 'Actualizar':
        this.l = false;
        this.a = true;
        this.b = false;
        this.modulo.nombre = this.modulos[rowIndex].nombre;
        this.nombre = this.modulos[rowIndex].nombre;
        this.titulo_model = 'Actualizar Tipo de Servicio';
        this.formulario.controls['id'].setValue(this.modulos[rowIndex].id);
        this.formulario.controls['nombre'].setValue(this.modulos[rowIndex].nombre);
        break;
      case 'Borrar':
        this.l = false;
        this.a = false;
        this.b = true;
        this.titulo_model = 'Borrar Tipo de Servicio';
        this.id = this.modulos[rowIndex].id;
        break;
      case false:
        this.agregar = true;
        this.titulo_model = 'Agregar Tipo de Servicio';
        break;
      default:
        break;
    }
  }

  addModulo() {
    let moduloNombre = {}
    this.modulo.nombre = this.formulario.get('nombre')?.value;
    moduloNombre = this.modulos.find((modulo: { titulo: any; }) => 
      modulo.titulo === this.modulo.titulo
    );
    this.agregar = false;

    if (!moduloNombre) {
      this.ModuloService.createModulo(this.modulo).subscribe(
        (response: any) => {
          this.agregar = false; 
          this.modulo = {};
          this.formulario.reset();
          this.todosModulo();
        },
        (error) => {
          console.log(error);
          this.visibleFallo = !this.visibleFallo
          setTimeout(() => {
            this.todosModulo();
          }, 3000);
        });
      }else{
        this.visibleRepetido = !this.visibleRepetido
        setTimeout(() => {
          moduloNombre = {}
          this.todosModulo();
        }, 3000);
      }
  }

  updateModulo() {
    let moduloNombre = {nombre: ''}
    let nombreModulo = ''
    let actualiza = true;
    this.modulo.id = this.formulario.get('id')?.value;
    this.modulo.nombre = this.formulario.get('nombre')?.value;
  
    moduloNombre = this.modulos.find(modulo => modulo.nombre === this.modulo.nombre); 
    if (moduloNombre) nombreModulo = moduloNombre.nombre
    
    this.modulos.forEach(e => {
      if (e.nombre == nombreModulo && nombreModulo != this.nombre) {
        actualiza = false
        this.visibleRepetido = !this.visibleRepetido
        setTimeout(() => {
          this.todosModulo();
        }, 3000);
        }
    });

    if (actualiza) {
      this.ModuloService.actualizarModulo(this.modulo).subscribe(
        (response: any) => {
          this.modulo = {};
          this.todosModulo();
          this.formulario.reset();
          this.a = false
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }

  deleteModulo(id: Number) {
    this.modulo.id = id;
    this.ModuloService.borrarModulo(this.modulo.id).subscribe(
      (response: any) => {
        this.todosModulo();
        this.modulo = {};
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
    this.modulos = filteredData;
    this.modulos = [...this.modulos];
  }
}
