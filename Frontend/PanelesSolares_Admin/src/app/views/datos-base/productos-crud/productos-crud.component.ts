import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductosService } from '../../../services/productos.service';
import { RolPermisosService } from '../../../services/rol-permisos.service';
import {
  ColumnMode,
  DatatableComponent,
  NgxDatatableModule,
} from '@swimlane/ngx-datatable';
import { Router } from '@angular/router';
import { Permiso } from 'src/app/models/Permiso.enum';

@Component({
  selector: 'app-productos-crud',
  templateUrl: './productos-crud.component.html',
  styleUrls: ['./productos-crud.component.scss'],
  // imports: [NgxDatatableModule]
})
export class ProductosCrudComponent implements OnInit {
  @ViewChild(DatatableComponent) mydatatable: DatatableComponent | undefined;

  formulario: FormGroup;

  ColumnMode = ColumnMode;

  constructor(
    private fb: FormBuilder,
    private RolPermisosService: RolPermisosService,
    private productoService: ProductosService,
    private router: Router
  ) {

    const item = localStorage.getItem('logged');
    if (item == 'false') {
      this.router.navigateByUrl('/login');
    }

    this.formulario = this.fb.group({
      id: [0],
      nombre: ['', Validators.required],
      referencia: ['', Validators.required],
      descripcion: ['', Validators.required],
      marca: ['', Validators.required],
      cantidad_minima: ['', Validators.required],
      cantidad_actual: ['', Validators.required],
      precio_compra: ['', Validators.required],
      precio_venta: ['', Validators.required],
    });
  }

  columns = [
    { prop: 'id' },
    { prop: 'nombre'},
    { prop: 'referencia'},
    { prop: 'descripcion'},
    { prop: 'marca'},
    { prop: 'cantidad_minima'},
    { prop: 'cantidad_actual'},
    { prop: 'precio_venta'},
    { prop: 'precio_compra'},
    { prop: 'acciones'}
  ];

  productos: Array<any> = [];
  producto: any = {};
  tempProductos: Array<any> = [];

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
  referencia: String = '';
  descripcion: String = '';
  marca: String = '';
  cantidad_minima: Number = 0;
  cantidad_actual: Number = 0;
  precio_venta: Number = 0;
  precio_compra: Number = 0;

  agregar: Boolean = false;
  titulo_model: String = '';
  ejemplo: any;

  contenedorImgcontactos: any = {};
  contenedorImgcontactosActualizada: any = {};

  loadingIndicator!: Boolean;
  
  permisos: any = {}

  visibleRepetido: boolean = false;
  visibleFallo: boolean = false;
  position: string = "middle-center";

  todosProductos() {
    this.visibleFallo = false
    this.visibleRepetido = false
    this.productoService.getProductos().subscribe(
      (response: any) => {
        this.tempProductos = response;
        for (let i = 0; i < this.tempProductos.length; i++) {
          if (i >= 0) {
            this.tempProductos[i].acciones = this.botones;
            this.tempProductos = [...this.tempProductos];
          }
        }

        this.productos = response;
        this.productos = [...this.productos];
        this.loadingIndicator = true;
        this.permisosAcciones()
        console.log(this.productos);
        
      },
      (error) => {
        console.log(error);
      }
    );
  }

  ngOnInit() {
    this.todosProductos();
  }

  permisosAcciones(){
    const email: any = localStorage.getItem('persona_email')
    console.log(email);
    
    this.RolPermisosService.obtenerPermisos('producto', email).subscribe(
      (response: any) => {
        console.log(response);
        
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
        this.titulo_model = 'Datos Producto';
        this.id = this.productos[rowIndex].id;
        this.nombre = this.productos[rowIndex].nombre;
        this.referencia = this.productos[rowIndex].referencia;
        this.descripcion = this.productos[rowIndex].descripcion;
        this.marca = this.productos[rowIndex].marca;
        this.cantidad_minima = this.productos[rowIndex].cantidad_minima;
        this.cantidad_actual = this.productos[rowIndex].cantidad_actual;
        this.precio_venta = this.productos[rowIndex].precio_venta;
        this.precio_compra = this.productos[rowIndex].precio_compra;
        break;
      case 'Actualizar':
        this.l = false;
        this.a = true;
        this.b = false;
        this.titulo_model = 'Actualizar Producto';
        this.formulario.controls['id'].setValue(this.productos[rowIndex].id);
        this.formulario.controls['nombre'].setValue(this.productos[rowIndex].nombre);
        this.formulario.controls['referencia'].setValue(this.productos[rowIndex].referencia);
        this.formulario.controls['descripcion'].setValue(this.productos[rowIndex].descripcion);
        this.formulario.controls['marca'].setValue(this.productos[rowIndex].marca);
        this.formulario.controls['cantidad_minima'].setValue(this.productos[rowIndex].cantidad_minima);
        this.formulario.controls['cantidad_actual'].setValue(this.productos[rowIndex].cantidad_actual);
        this.formulario.controls['precio_venta'].setValue(this.productos[rowIndex].precio_venta);
        this.formulario.controls['precio_compra'].setValue(this.productos[rowIndex].precio_compra);
        break;
      case 'Borrar':
        this.l = false;
        this.a = false;
        this.b = true;
        this.titulo_model = 'Borrar Producto';
        this.id = this.productos[rowIndex].id;
        break;
      case false:
        this.agregar = true;
        this.titulo_model = 'Agregar Producto';
        break;
      default:
        break;
    }
  }

  addProducto() {
    let productoNombre = {}
    this.producto.nombre = this.formulario.get('nombre')?.value;
    productoNombre = this.productos.find((producto: { nombre: any; }) => producto.nombre === this.producto.nombre);
    this.producto.referencia = this.formulario.get('referencia')?.value;
    this.producto.descripcion = this.formulario.get('descripcion')?.value;
    this.producto.marca = this.formulario.get('marca')?.value;
    this.producto.cantidad_minima = this.formulario.get('cantidad_minima')?.value;
    this.producto.cantidad_actual = this.formulario.get('cantidad_actual')?.value;
    this.producto.precio_venta = this.formulario.get('precio_venta')?.value;
    this.producto.precio_compra = this.formulario.get('precio_compra')?.value;

    this.agregar = false;
    
    if (!productoNombre) {
      this.productoService.createProducto(this.producto).subscribe(
        (response: any) => {
          this.agregar = false; //// Agregar mensaje confirmación por 2s, tarea
          this.producto = {};
          this.formulario.reset();
          this.todosProductos();
        },
        (error) => {
          console.log(error);
          this.visibleFallo = !this.visibleFallo
          setTimeout(() => {
            this.todosProductos();
          }, 3000);
        });
      }else{
        this.visibleRepetido = !this.visibleRepetido
        setTimeout(() => {
          this.todosProductos();
        }, 3000);
      }

  }

  updateProducto() {
    let productoNombre = {nombre: ''}
    let nombreProducto = ''
    let actualiza = true;
    this.producto.id = this.formulario.get('id')?.value;
    this.producto.nombre = this.formulario.get('nombre')?.value;
    productoNombre = this.productos.find(producto => producto.nombre === this.producto.nombre); 
      if (productoNombre) nombreProducto = productoNombre.nombre
    this.producto.referencia = this.formulario.get('referencia')?.value;
    this.producto.descripcion = this.formulario.get('descripcion')?.value;
    this.producto.marca = this.formulario.get('marca')?.value;
    this.producto.cantidad_minima = this.formulario.get('cantidad_minima')?.value;
    this.producto.cantidad_actual = this.formulario.get('cantidad_actual')?.value;
    this.producto.precio_venta = this.formulario.get('precio_venta')?.value;
    this.producto.precio_compra = this.formulario.get('precio_compra')?.value;

    this.productos.forEach(e => {
      if (e.nombre == nombreProducto && nombreProducto != this.nombre) {
        actualiza = false
        this.visibleRepetido = !this.visibleRepetido
        setTimeout(() => {
          this.todosProductos();
        }, 3000);
        }
    });

    if (actualiza) {
      this.productoService.actualizarProducto(this.producto).subscribe(
        (response: any) => {
          this.producto = {};
          this.todosProductos();
          this.a = !this.a;
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }

  deleteProducto(id: Number) {
    this.producto.id = id;
    this.productoService.borrarProducto(this.producto.id).subscribe(
      (response: any) => {
        this.todosProductos();
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
    const filteredData = this.tempProductos.filter((row) => {
      return (
        row.nombre.toLowerCase().indexOf(val) !== -1 ||
        row.referencia.toLowerCase().indexOf(val) !== -1 ||
        row.descripcion.toLowerCase().indexOf(val) !== -1
      );
    });
    // Restablece el offset de la tabla para mostrar los resultados desde el principio
    this.productos = filteredData;
    this.productos = [...this.productos];

    // this.mydatatable.offset = 0;
  }
}
