import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DetalleVentaService } from '../../../services/detalle-venta.service';
import { ServicioVentaService } from '../../../services/servicio-venta.service';
import { ProductosService } from '../../../services/productos.service';
import { RolPermisosService } from '../../../services/rol-permisos.service';
import { ColumnMode, DatatableComponent, NgxDatatableModule } from '@swimlane/ngx-datatable';
import { Router } from '@angular/router';
import { Permiso } from 'src/app/models/Permiso.enum';


@Component({
  selector: 'app-detalle-venta-crud',
  templateUrl: './detalle-venta-crud.component.html',
  styleUrls: ['./detalle-venta-crud.component.scss']
})
export class DetalleVentaCrudComponent implements OnInit{
  @ViewChild(DatatableComponent) mydatatable: DatatableComponent | undefined;

  formulario: FormGroup

  ColumnMode = ColumnMode;

  constructor(
    private fb: FormBuilder,
    private DetalleVentaService: DetalleVentaService,
    private ServicioVentaService: ServicioVentaService,
    private ProductosService: ProductosService,
    private RolPermisosService: RolPermisosService,
    private router: Router
    
    ) { 

    const item = localStorage.getItem('logged');
    if (item == 'false') {
      this.router.navigateByUrl('/login');
    }

    this.formulario = this.fb.group({
      servicio_venta_id: [0],
      producto_id: ['', Validators.required],
      cantidad: ['', [Validators.required, Validators.minLength(5)]],
    });
  }

  columns = [
    { prop: 'servicio_venta_id' },
    { prop: 'producto_id'},
    { prop: 'cantidad'}
  ];

  detalles: Array<any> = [];
  detalle_del: any = {
    servicio_venta_id: null,
    producto_id: null
  };
  detalle: any = {};
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
  servicio_venta_id: Array<any> = [];
  producto_id: Array<any> = [];

  servicio_venta_id_del: Array<any> = [];
  producto_id_del: Array<any> = [];

  servicio_venta_idf: String = '';
  producto_idf: String = '';
  cantidad: String = '';

  agregar: Boolean = false;
  titulo_model: String = '';
  ejemplo: any;

  contenedorImgcontactos: any = {};
  contenedorImgcontactosActualizada: any = {};

  permisos: any = {}

  visibleRepetido: boolean = false;
  visibleFallo: boolean = false;
  visibleNoPosible: boolean = false;
  position: string = "middle-center";

  todosDetalles() {
    this.visibleFallo = false
    this.visibleRepetido = false
    this.visibleNoPosible = false
    this.DetalleVentaService.getDetalles().subscribe(
      (response: any) => {
        this.tempContactos = response;
        for (let i = 0; i < this.tempContactos.length; i++) {
          if (i >= 0) {
            this.tempContactos[i].acciones = this.botones;
            this.tempContactos = [...this.tempContactos];
          }
        }

        this.detalles = response;
        this.detalles = [...this.detalles];
        this.permisosAcciones()
      },
      (error) => {
        console.log(error);
      }
    );

    this.ServicioVentaService.getServicios().subscribe(
      (response: any) => {
        this.servicio_venta_id = response.map((item: { id: any; nombre: any; }) => ({ 
          id: item.id,
          nombre: item.nombre 
        }));
      },
      (error) => {
        console.log(error);
      }
    );

    this.ProductosService.getProductos().subscribe(
      (response: any) => {
        this.producto_id = response.map((item: { id: any; nombre: any; }) => ({ 
          id: item.id,
          nombre: item.nombre 
        }));
      },
      (error) => {
        console.log(error);
      }
    );
  }

  ngOnInit() {
    this.todosDetalles();
  }
  
  permisosAcciones(){
    const modulo: any = localStorage.getItem('persona_email')

    this.RolPermisosService.obtenerPermisos('detalle_venta', modulo).subscribe(
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

  getServicioVenta(id: any): any {
    const tipoPago = this.servicio_venta_id.find((item: { id: any; }) => item.id === id);
    return tipoPago ? tipoPago.nombre : null;
  }

  getProducto(id: any): any {
    const tipoPago = this.producto_id.find((item: { id: any; }) => item.id === id);
    return tipoPago ? tipoPago.nombre : null;
  }

  accionesClick(cell: any, rowIndex: any, item: any) {
    switch (item) {
      case 'Leer':
        this.l = true;
        this.a = false;
        this.b = false;
        this.titulo_model = 'Datos Detalle Venta';
        this.servicio_venta_idf = this.detalles[rowIndex].servicio_venta_id;
        this.producto_idf = this.detalles[rowIndex].producto_id;
        this.cantidad = this.detalles[rowIndex].cantidad;
        break;
      case 'Actualizar':
        this.l = false;
        this.a = true;
        this.b = false;
        this.titulo_model = 'Actualizar Detalle Venta';
        this.servicio_venta_idf = this.detalles[rowIndex].servicio_venta_id;
        this.producto_idf = this.detalles[rowIndex].producto_id;
        this.formulario.controls['servicio_venta_id'].setValue(this.detalles[rowIndex].servicio_venta_id);
        this.formulario.controls['producto_id'].setValue(this.detalles[rowIndex].producto_id);
        this.formulario.controls['cantidad'].setValue(this.detalles[rowIndex].cantidad);
        break;
      case 'Borrar':
        this.l = false;
        this.a = false;
        this.b = true;
        this.titulo_model = 'Borrar Detalle Venta';
        this.servicio_venta_id_del = this.detalles[rowIndex].servicio_venta_id;
        this.producto_id_del = this.detalles[rowIndex].producto_id;
        break;
      case false:
        this.agregar = true;
        this.titulo_model = 'Agregar Detalle Venta';
        break;
      default:
        break;
    }
  }

  addDetalle() {
    let detalleNombre = {}
    
    this.detalle.servicio_venta_id = this.formulario.get('servicio_venta_id')?.value;
    this.detalle.producto_id = this.formulario.get('producto_id')?.value;
    detalleNombre = this.detalles.find((detalle: { producto_id: any, servicio_venta_id: any; }) => 
      (detalle.producto_id === this.detalle.producto_id && detalle.servicio_venta_id === this.detalle.servicio_venta_id)
    );//////
    this.detalle.cantidad = this.formulario.get('cantidad')?.value;
    this.agregar = false;

    if (!detalleNombre) {
      this.DetalleVentaService.createDetalle(this.detalle).subscribe(
        (response: any) => {
          this.agregar = false; //// Agregar mensaje confirmación por 2s, tarea
          this.detalle = {};
          this.formulario.reset();
          this.todosDetalles();
        },
        (error) => {
          console.log(error);
          this.visibleFallo = !this.visibleFallo
          setTimeout(() => {
            this.todosDetalles();
          }, 3000);
        });
    }else{
      this.visibleRepetido = !this.visibleRepetido
      setTimeout(() => {
        this.todosDetalles();
      }, 3000);
    }
  }

  updateDetalle() {
    let detalleNombre = {servicio_venta_id: '', producto_id: ''}
    let nombreDetalle = ''
    let nombreProducto = ''
    let actualiza = true;

    this.detalle.servicio_venta_id = this.formulario.get('servicio_venta_id')?.value;
    this.detalle.producto_id = this.formulario.get('producto_id')?.value;
    detalleNombre = this.detalles.find((detalle: { producto_id: any, servicio_venta_id: any; }) => 
      (detalle.producto_id === this.detalle.producto_id && detalle.servicio_venta_id === this.detalle.servicio_venta_id)
    );
      if (detalleNombre) {nombreDetalle = detalleNombre.servicio_venta_id; nombreProducto = detalleNombre.producto_id}
    this.detalle.cantidad = this.formulario.get('cantidad')?.value;

    if (nombreDetalle != this.servicio_venta_idf || nombreProducto != this.producto_idf) {
      actualiza = false
      this.visibleNoPosible = !this.visibleNoPosible
      setTimeout(() => {
        this.todosDetalles();
        this.visibleNoPosible = false;
      }, 3000);
    }

    if (actualiza) {
      this.DetalleVentaService.actualizarDetalles(this.detalle).subscribe(
        (response: any) => {
          this.detalle = {};
          this.todosDetalles();
          this.a = !this.a;
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }

  deleteDetalle() {
    
    this.DetalleVentaService.borrarDetalle(this.servicio_venta_id_del, this.producto_id_del).subscribe(
      (response: any) => {
        this.detalle_del = {};
        this.todosDetalles();
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
    const filteredData = this.tempContactos.filter((row) => {
      return (
        this.getServicioVenta(row.servicio_venta_id).toLowerCase().indexOf(val) !== -1 ||
        this.getProducto(row.producto_id).toLowerCase().indexOf(val) !== -1 ||
        row.cantidad.toString().indexOf(val) !== -1
      );
    });
    // Restablece el offset de la tabla para mostrar los resultados desde el principio
    this.detalles = filteredData;
    this.detalles = [...this.detalles];

    // this.mydatatable.offset = 0;
  }
}
