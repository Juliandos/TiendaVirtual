import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RolPermisosService } from '../../../services/rol-permisos.service';
import { TipoPagoService } from '../../../services/tipo-pago.service';
import {
  ColumnMode,
  DatatableComponent,
} from '@swimlane/ngx-datatable';
import { Router } from '@angular/router';
import { Permiso } from 'src/app/models/Permiso.enum';

@Component({
  selector: 'app-tipo-pago-crud',
  templateUrl: './tipo-pago-crud.component.html',
  styleUrls: ['./tipo-pago-crud.component.scss']
})
export class TipoPagoCrudComponent implements OnInit{
  @ViewChild(DatatableComponent) mydatatable: DatatableComponent | undefined;

  formulario: FormGroup;

  ColumnMode = ColumnMode;

  constructor(
    private fb: FormBuilder,
    private tipoService: TipoPagoService,
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
      status: [false, Validators.required]
    });
  }

  columns = [
    { prop: 'id' },
    { prop: 'nombre'},
    { prop: 'status'}
  ];

  tipos: Array<any> = [];
  tipo: any = {};
  tempTipos: Array<any> = [];

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
    this.tipoService.getTiposPago().subscribe(
      (response: any) => {
        this.tempTipos = response;
        for (let i = 0; i < this.tempTipos.length; i++) {
          if (i >= 0) {
            this.tempTipos[i].acciones = this.botones;
            this.tempTipos = [...this.tempTipos];
          }
        }
        this.tipos = response;
        this.tipos = [...this.tipos];
        this.permisosAcciones()
      },
      (error) => {
        console.log(error);
      }
    );
  }

  ngOnInit() {
    this.todosTipos();
  }

  permisosAcciones(){
    const modulo: any = localStorage.getItem('persona_email')

    this.RolPermisosService.obtenerPermisos('tipo_pago', modulo).subscribe(
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
        this.titulo_model = 'Datos Tipo Pago';
        this.id = this.tipos[rowIndex].id;
        this.nombre = this.tipos[rowIndex].nombre;
        this.status = this.tipos[rowIndex].status;
        break;
      case 'Actualizar':
        this.l = false;
        this.a = true;
        this.b = false;
        this.titulo_model = 'Actualizar Tipo Pago';
        this.nombre = this.tipos[rowIndex].nombre;
        this.formulario.controls['id'].setValue(this.tipos[rowIndex].id);
        this.formulario.controls['nombre'].setValue(this.tipos[rowIndex].nombre);
        this.formulario.controls['status'].setValue(this.tipos[rowIndex].status);
        break;
      case 'Borrar':
        this.l = false;
        this.a = false;
        this.b = true;
        this.titulo_model = 'Borrar Tipo Pago';
        this.id = this.tipos[rowIndex].id;
        break;
      case false:
        this.agregar = true;
        this.titulo_model = 'Agregar Tipo de Pago';
        break;
      default:
        break;
    }
  }

  addTipo() {
    let tipoNombre = {}
    
    this.tipo.nombre = this.formulario.get('nombre')?.value;
    tipoNombre = this.tipos.find((tipo: { nombre: any; }) => tipo.nombre === this.tipo.nombre);

    this.tipo.status = this.formulario.get('status')?.value;
    this.agregar = false;

    if (!tipoNombre) {
      this.tipoService.createTipoPago(this.tipo).subscribe(
        (response: any) => {
          this.agregar = false; 
          this.tipo = {};
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

  updateTipo() {
    let tipoNombre = {nombre: ''}
    let nombreTipo = ''
    let actualiza = true;
    this.tipo.id = this.formulario.get('id')?.value;
    this.tipo.nombre = this.formulario.get('nombre')?.value;
    tipoNombre = this.tipos.find(tipo => tipo.nombre === this.tipo.nombre); 
    if (tipoNombre) nombreTipo = tipoNombre.nombre
    this.tipo.status = this.formulario.get('status')?.value;
  
    this.tipos.forEach(e => {
      if (e.nombre == nombreTipo && nombreTipo != this.nombre) {
        actualiza = false
        this.visibleRepetido = !this.visibleRepetido
        setTimeout(() => {
          this.todosTipos();
        }, 3000);
        }
    });

    if (actualiza) {
      this.tipoService.actualizarTipoPago(this.tipo).subscribe(
        (response: any) => {
          this.tipo = {};
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
    this.tipo.id = id;
    this.tipoService.borrarTipo(this.tipo.id).subscribe(
      (response: any) => {
        this.todosTipos();
        this.tipo = {};
        this.b = false
      },
      (error) => {
        console.log(error);
      }
    );
  }

  getStatus(status: any): any {
    if (status) return 'Activo' 
    else return 'Inactivo'
  }

  updateFilter(event: any): void {
    const val = event.target.value.toLowerCase();
    const filteredData = this.tempTipos.filter((row) => {
      return (
        row.nombre.toLowerCase().indexOf(val) !== -1 ||
        this.getStatus(row.status).toLowerCase().indexOf(val) !== -1 
      );
    });
    this.tipos = filteredData;
    this.tipos = [...this.tipos];
  }
}
