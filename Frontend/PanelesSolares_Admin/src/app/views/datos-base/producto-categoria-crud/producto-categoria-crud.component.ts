import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoriasService } from '../../../services/categorias.service';
import { ProductosService } from '../../../services/productos.service';
import { ProductoCategoriaService } from '../../../services/producto-categoria.service';
import { RolPermisosService } from '../../../services/rol-permisos.service';
import { ColumnMode, DatatableComponent, NgxDatatableModule } from '@swimlane/ngx-datatable';
import { Router } from '@angular/router';
import { Permiso } from 'src/app/models/Permiso.enum';

@Component({
  selector: 'app-producto-categoria-crud',
  templateUrl: './producto-categoria-crud.component.html',
  styleUrls: ['./producto-categoria-crud.component.scss']
})
export class ProductoCategoriaCrudComponent implements OnInit {
  @ViewChild(DatatableComponent) mydatatable: DatatableComponent | undefined;

  formulario: FormGroup

  ColumnMode = ColumnMode;

  constructor(
    private fb: FormBuilder,
    private CategoriasService: CategoriasService,
    private ProductosService: ProductosService,
    private RolPermisosService: RolPermisosService,
    private ProductoCategoriaService: ProductoCategoriaService,
    private router: Router
    ) { 
    const item = localStorage.getItem('logged');
    if (item == 'false') {
      this.router.navigateByUrl('/login');
    }
    this.formulario = this.fb.group({
      categoria_id: [0],
      producto_id: ['', Validators.required]
    });
  }

  columns = [
    { prop: 'categoria_id' },
    { prop: 'producto_id'}
  ];

  ProCats: Array<any> = [];
  ProCatDel: any = {
    categoria_id: null,
    producto_id: null
  };
  ProCat: any = {};
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
  categoria_id: Array<any> = [];
  producto_id: Array<any> = [];

  categoria_id_del: Array<any> = [];
  producto_id_del: Array<any> = [];

  categoria_idf: String = '';
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

  todosProCat() {
    this.visibleFallo = false
    this.visibleRepetido = false
    this.visibleNoPosible = false
    this.ProductoCategoriaService.getProCat().subscribe(
      (response: any) => {
        this.tempContactos = response;
        for (let i = 0; i < this.tempContactos.length; i++) {
          if (i >= 0) {
            this.tempContactos[i].acciones = this.botones;
            this.tempContactos = [...this.tempContactos];
          }
        }

        this.ProCats = response;
        this.ProCats = [...this.ProCats];
        this.permisosAcciones()
      },
      (error) => {
        console.log(error);
      }
    );

    this.CategoriasService.getCategorias().subscribe(
      (response: any) => {
        this.categoria_id = response.map((item: { id: any; nombre: any; }) => ({ 
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
    this.todosProCat();
  }
  
  permisosAcciones(){
    const modulo: any = localStorage.getItem('persona_email')

    this.RolPermisosService.obtenerPermisos('producto_categoria', modulo).subscribe(
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

  getProCat(id: any): any {
    const tipoPago = this.categoria_id.find((item: { id: any; }) => item.id === id);
    
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
        this.titulo_model = 'Datos Producto Categoria';
        this.categoria_idf = this.ProCats[rowIndex].categoria_id;
        this.producto_idf = this.ProCats[rowIndex].producto_id;
        this.cantidad = this.ProCats[rowIndex].cantidad;
        break;
      case 'Actualizar':
        this.l = false;
        this.a = true;
        this.b = false;
        this.titulo_model = 'Actualizar Producto Categoria';
        this.categoria_idf = this.ProCats[rowIndex].categoria_id;
        this.producto_idf = this.ProCats[rowIndex].producto_id;
        this.formulario.controls['categoria_id'].setValue(this.ProCats[rowIndex].categoria_id);
        this.formulario.controls['producto_id'].setValue(this.ProCats[rowIndex].producto_id);
        break;
      case 'Borrar':
        this.l = false;
        this.a = false;
        this.b = true;
        this.titulo_model = 'Borrar Producto Categoria';
        this.categoria_id_del = this.ProCats[rowIndex].categoria_id;
        this.producto_id_del = this.ProCats[rowIndex].producto_id;
        break;
      case false:
        this.agregar = true;
        this.titulo_model = 'Agregar Producto Categoria';
        break;
      default:
        break;
    }
  }

  addProCat() {
    let proCat = {}
    this.ProCat.categoria_id = this.formulario.get('categoria_id')?.value;
    this.ProCat.producto_id = this.formulario.get('producto_id')?.value;
    proCat = this.ProCats.find((proCat: { producto_id: any, categoria_id: any; }) => 
      (proCat.producto_id === this.ProCat.producto_id && proCat.categoria_id === this.ProCat.categoria_id)
    );//////
    this.agregar = false;
    // console.log(proCat);
    
    if (!proCat) {
      this.ProductoCategoriaService.createProCat(this.ProCat).subscribe(
        (response: any) => {
          this.agregar = false; //// Agregar mensaje confirmación por 2s, tarea
          this.ProCat = {};
          this.formulario.reset();
          this.todosProCat();
        },
        (error) => {
          console.log(error);
          this.visibleFallo = !this.visibleFallo
          setTimeout(() => {
            this.todosProCat();
          }, 3000);
        });
    }else{
      this.visibleRepetido = !this.visibleRepetido
      setTimeout(() => {
        this.todosProCat();
      }, 3000);
    }
      
  }

  updateProCat() {//esta no debería estar (quitar boton actualizar)
    let proCat = {categoria_id: '', producto_id: ''}
    let nombreCategoria = ''
    let nombreProducto = ''
    let actualiza = true;
    this.ProCat.categoria_id = this.formulario.get('categoria_id')?.value;
    this.ProCat.producto_id = this.formulario.get('producto_id')?.value;
    // proCat = this.ProCats.find((procat: { producto_id: any, categoria_id: any; }) => 
    //   (procat.producto_id === this.ProCat.producto_id && procat.categoria_id === this.ProCat.categoria_id)
    // );
    //   if (proCat) {nombreCategoria = proCat.categoria_id; nombreProducto = proCat.producto_id}

    // if (nombreCategoria != this.categoria_idf || nombreProducto != this.producto_idf) {
    //   actualiza = false
    //   this.visibleNoPosible = !this.visibleNoPosible
    //   setTimeout(() => {
    //     this.todosProCat();
    //     this.visibleNoPosible = false;
    //   }, 3000);
    // }
    this.ProductoCategoriaService.actualizarProCat(this.ProCat).subscribe(
      (response: any) => {
        this.ProCat = {};
        this.todosProCat();
        this.a = !this.a;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  deleteProCat() {
    this.ProductoCategoriaService.borrarProCat(this.categoria_id_del, this.producto_id_del).subscribe(
      (response: any) => {
        this.ProCatDel = {};
        this.todosProCat();
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
        this.getProCat(row.categoria_id).toLowerCase().indexOf(val) !== -1 ||
        this.getProducto(row.producto_id).toLowerCase().indexOf(val) !== -1 ||
        row.cantidad.toString().indexOf(val) !== -1
      );
    });
    // Restablece el offset de la tabla para mostrar los resultados desde el principio
    this.ProCats = filteredData;
    this.ProCats = [...this.ProCats];

    // this.mydatatable.offset = 0;
  }
}
