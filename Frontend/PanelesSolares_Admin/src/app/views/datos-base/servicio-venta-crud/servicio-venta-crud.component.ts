import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ServicioVentaService } from '../../../services/servicio-venta.service';
import { ServicioTipoService } from '../../../services/servicio-tipo.service';
import { TipoPagoService } from '../../../services/tipo-pago.service';
import { RolPermisosService } from '../../../services/rol-permisos.service';
import {
  ColumnMode,
  DatatableComponent,
} from '@swimlane/ngx-datatable';
import { Router } from '@angular/router';
import { Permiso } from 'src/app/models/Permiso.enum';

interface AnyObject {
  [key: string]: any;
}

@Component({
  selector: 'app-servicio-venta-crud',
  templateUrl: './servicio-venta-crud.component.html',
  styleUrls: ['./servicio-venta-crud.component.scss']
})
export class ServicioVentaCrudComponent implements OnInit{
  @ViewChild(DatatableComponent) mydatatable: DatatableComponent | undefined;

  formulario: FormGroup;

  ColumnMode = ColumnMode;

  constructor(
    private fb: FormBuilder,
    private serviceService: ServicioVentaService,
    private serviceTipoService: ServicioTipoService,
    private tipoPagoService: TipoPagoService,
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
      fecha_ejecucion: ['', Validators.required],
      fecha_finalizacion: ['', Validators.required],
      servicio_tipo: [0, Validators.required],
      detalles: ['', Validators.required],
      referencia_cobro: ['', Validators.required],
      direccion: ['', Validators.required],
      status: [0, Validators.required],
      tipo_pago : [0, Validators.required],
    });
  }

  columns = [
    { prop: 'id' },
    { prop: 'nombre'},
    { prop: 'fecha_ejecucion'},
    { prop: 'fecha_finalizacion'},
    { prop: 'servicio_tipo'},
    { prop: 'detalles'},
    { prop: 'referencia_cobro'},
    { prop: 'direccion'},
    { prop: 'status'},
    { prop: 'tipo_pago'},
    { prop: 'acciones'}
  ];

  servicios: Array<any> = [];
  servicio: any = {};
  tempServicios: Array<any> = [];

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
  fecha_ejecucion: Date = new Date();
  fecha_finalizacion: Date = new Date();
  servicio_tipof: String = '';
  detalles: String = '';
  referencia_cobro: String = '';
  direccion: String = '';
  status: Number = 0;
  tipo_pagof: String = '';

  agregar: Boolean = false;
  titulo_model: String = '';
  ejemplo: any;

  permisos: any = {};

  visibleRepetido: boolean = false;
  visibleFallo: boolean = false;
  position: string = "middle-center";

  todosServicios() {
    this.visibleFallo = false
    this.visibleRepetido = false
    this.serviceService.getServicios().subscribe(
      (response: any) => {
        this.tempServicios = response;
        for (let i = 0; i < this.tempServicios.length; i++) {
          if (i >= 0) {
            this.tempServicios[i].acciones = this.botones;
            this.tempServicios = [...this.tempServicios];
          }
        }
        this.servicios = response;
        this.servicios = [...this.servicios];
        this.permisosAcciones()
      },
      (error) => {
        console.log(error);
      }
    );

    this.serviceTipoService.getServiciosTipo().subscribe(
      (response: any) => {
        this.servicio_tipo = response.map((item: { id: any; nombre: any; }) => ({ id: item.id, nombre: item.nombre }));
      },
      (error) => {
        console.log(error);
      }
    );

    this.tipoPagoService.getTiposPago().subscribe(
      (response: any) => {
        this.tipo_pago = response.map((item: { id: any; nombre: any; status: any; }) => ({ id: item.id, nombre: item.nombre, status: item.status }));

        this.tipo_pago = this.tipo_pago.filter((i: {status:any}) => i.status === 1);
      },
      (error) => {
        console.log(error);
      }
    );

  }

  permisosAcciones(){
    const modulo: any = localStorage.getItem('persona_email')

    this.RolPermisosService.obtenerPermisos('servicio_venta', modulo).subscribe(
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

  getTipoPagoIdNombre(id: any): any {
    // Si se proporciona un número (id), buscar el nombre correspondiente
    const tipoPago = this.tipo_pago.find((item: { id: any; }) => item.id === id);
    return tipoPago ? tipoPago.nombre : null;
  }

  getServicioTipoNombre(id: any): string {
    const servicioTipo = this.servicio_tipo.find((item: { id: any; }) => item.id === id);
    return servicioTipo ? servicioTipo.nombre : '';
  }

  ngOnInit() {
    this.todosServicios();
  }

  accionesClick(cell: any, rowIndex: any, item: any) {
    switch (item) {
      case 'Leer':
        this.l = true;
        this.a = false;
        this.b = false;
        this.titulo_model = 'Datos Servicio';
        this.id = this.servicios[rowIndex].id;
        this.nombre = this.servicios[rowIndex].nombre;
        this.fecha_ejecucion = this.servicios[rowIndex].fecha_ejecucion;
        this.fecha_finalizacion = this.servicios[rowIndex].fecha_finalizacion;
        this.servicio_tipof = this.getServicioTipoNombre(this.servicios[rowIndex].servicio_tipo_id);
        this.detalles = this.servicios[rowIndex].detalles;
        this.referencia_cobro = this.servicios[rowIndex].referencia_cobro;
        this.direccion = this.servicios[rowIndex].direccion;
        this.status = this.servicios[rowIndex].status;
        this.tipo_pagof = this.getTipoPagoIdNombre(this.servicios[rowIndex].tipo_pago_id);
        break;
      case 'Actualizar':
        this.l = false;
        this.a = true;
        this.b = false;
        this.titulo_model = 'Actualizar Servicio';
        this.formulario.controls['id'].setValue(this.servicios[rowIndex].id);
        this.formulario.controls['nombre'].setValue(this.servicios[rowIndex].nombre);
        this.formulario.controls['fecha_ejecucion'].setValue(this.servicios[rowIndex].fecha_ejecucion);
        this.formulario.controls['fecha_finalizacion'].setValue(this.servicios[rowIndex].fecha_finalizacion);
        this.formulario.controls['servicio_tipo'].setValue(this.servicios[rowIndex].servicio_tipo_id);
        this.formulario.controls['detalles'].setValue(this.servicios[rowIndex].detalles);
        this.formulario.controls['referencia_cobro'].setValue(this.servicios[rowIndex].referencia_cobro);
        this.formulario.controls['direccion'].setValue(this.servicios[rowIndex].direccion);
        this.formulario.controls['status'].setValue(this.servicios[rowIndex].status);
        this.formulario.controls['tipo_pago'].setValue(this.servicios[rowIndex].tipo_pago_id);
        break;
      case 'Borrar':
        this.l = false;
        this.a = false;
        this.b = true;
        this.titulo_model = 'Borrar Servicio';
        this.id = this.servicios[rowIndex].id;
        break;
      case false:
        this.agregar = true;
        this.titulo_model = 'Agregar Servicio';
        break;
      default:
        break;
    }
  }

  addServicio() {
    let servicioNombre = {}
    this.servicio.nombre = this.formulario.get('nombre')?.value;
    servicioNombre = this.servicios.find((servicio: { nombre: any; }) => servicio.nombre === this.servicio.nombre);
    this.servicio.fecha_ejecucion = this.formulario.get('fecha_ejecucion')?.value;
    this.servicio.referencia_cobro = this.formulario.get('referencia_cobro')?.value;
    this.servicio.fecha_finalizacion = this.formulario.get('fecha_finalizacion')?.value;
    this.servicio.servicio_tipo_id = parseInt(this.formulario.get('servicio_tipo')?.value);
    this.servicio.detalles = this.formulario.get('detalles')?.value;
    this.servicio.direccion = this.formulario.get('direccion')?.value;
    this.servicio.status = parseInt(this.formulario.get('status')?.value);
    this.servicio.tipo_pago_id = parseInt(this.formulario.get('tipo_pago')?.value);
    this.agregar = false;

    if (!servicioNombre) {
      this.serviceService.createServicio(this.servicio).subscribe(
        (response: any) => {
          this.agregar = false; //// Agregar mensaje confirmación por 2s, tarea
          this.servicio = {};
          this.formulario.reset();
          this.todosServicios();
        },
        (error) => {
          console.log(error);
          this.visibleFallo = !this.visibleFallo
          setTimeout(() => {
            this.todosServicios();
          }, 3000);
        });
      }else{
        this.visibleRepetido = !this.visibleRepetido
        setTimeout(() => {
          this.todosServicios();
        }, 3000);
      }
  }

  updateServicio() {
    let servicioNombre = {nombre: ''}
    let nombreProducto = ''
    let actualiza = true;
    this.servicio.id = this.formulario.get('id')?.value;
    this.servicio.nombre = this.formulario.get('nombre')?.value;
    servicioNombre = this.servicios.find(servicio => servicio.nombre === this.servicio.nombre); 
      if (servicioNombre) nombreProducto = servicioNombre.nombre
    this.servicio.fecha_ejecucion = this.formulario.get('fecha_ejecucion')?.value;
    this.servicio.referencia_cobro = this.formulario.get('referencia_cobro')?.value;
    this.servicio.fecha_finalizacion = this.formulario.get('fecha_finalizacion')?.value;
    this.servicio.servicio_tipo_id = parseInt(this.formulario.get('servicio_tipo')?.value);
    this.servicio.detalles = this.formulario.get('detalles')?.value;
    this.servicio.direccion = this.formulario.get('direccion')?.value;
    this.servicio.status = parseInt(this.formulario.get('status')?.value);
    this.servicio.tipo_pago_id = parseInt(this.formulario.get('tipo_pago')?.value);

    this.servicios.forEach(e => {
      if (e.nombre == nombreProducto && nombreProducto != this.nombre) {
        actualiza = false
        this.visibleRepetido = !this.visibleRepetido
        setTimeout(() => {
          this.todosServicios();
        }, 3000);
        }
    });

    
    if (actualiza) {
      this.serviceService.actualizarServicio(this.servicio).subscribe(
        (response: any) => {
          this.servicio = {};
          this.todosServicios();
          this.formulario.reset();
          this.a = false
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }

  deleteServicio(id: Number) {
    this.servicio.id = id;
    this.serviceService.borrarServicio(this.servicio.id).subscribe(
      (response: any) => {
        this.todosServicios();
        this.servicio = {};
        this.b = false
      },
      (error) => {
        console.log(error);
      }
    );
  }

  updateFilter(event: any): void {
    const val = event.target.value.toLowerCase();
    const filteredData = this.tempServicios.filter((row) => {
      return (
        row.nombre.toLowerCase().indexOf(val) !== -1 ||
        row.fecha_ejecucion.indexOf(val) !== -1 ||
        row.fecha_finalizacion.indexOf(val) !== -1 ||
        this.getTipoPagoIdNombre(row.tipo_pago_id).toLowerCase().indexOf(val) !== -1 ||
        this.getServicioTipoNombre(row.servicio_tipo_id).toLowerCase().indexOf(val) !== -1
      );
    });
    this.servicios = filteredData;
    this.servicios = [...this.servicios];
  }
}
