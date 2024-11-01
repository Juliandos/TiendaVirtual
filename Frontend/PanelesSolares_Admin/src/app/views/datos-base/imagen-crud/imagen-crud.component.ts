import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductosService } from '../../../services/productos.service';
import { ImagenService } from '../../../services/imagen.service';
import { PermisosService } from '../../../services/permisos.service';
import { PersonaRolService } from '../../../services/persona-rol.service';
import { PersonasService } from '../../../services/personas.service';
import { RolService } from '../../../services/rol.service';
import { ModuloService } from '../../../services/modulo.service';
import { RolPermisosService } from '../../../services/rol-permisos.service';
import { ColumnMode, DatatableComponent, NgxDatatableModule } from '@swimlane/ngx-datatable';
import { Router } from '@angular/router';
import { Permiso } from 'src/app/models/Permiso.enum';

@Component({
  selector: 'app-imagen-crud',
  templateUrl: './imagen-crud.component.html',
  styleUrls: ['./imagen-crud.component.scss']
})
export class ImagenCrudComponent implements OnInit{
  @ViewChild(DatatableComponent) mydatatable: DatatableComponent | undefined;

  formulario: FormGroup

  ColumnMode = ColumnMode;

  constructor(
    private fb: FormBuilder,
    private ProductosService: ProductosService,
    private imagenService: ImagenService,
    private RolPermisosService: RolPermisosService,
    private RolService: RolService,
    private PermisosService: PermisosService,
    private ModuloService: ModuloService,
    private PersonasService: PersonasService,
    private PersonaRolService: PersonaRolService,
    private router: Router
    ) { 

    const item = localStorage.getItem('logged');
    if (item == 'false') {
      this.router.navigateByUrl('/login');
    }

    this.formulario = this.fb.group({
      id: [0],
      nombre: ['', Validators.required],
      url: ['', [Validators.required, Validators.minLength(5)]],
      producto_id: [0, Validators.required]
    });
  }

  columns = [
    { prop: 'id' },
    { prop: 'nombre'},
    { prop: 'url'},
    { prop: 'producto_id'}
  ];

  imagenes: Array<any> = [];
  imagen: any = {};
  tempImagenes: Array<any> = [];

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
  url: String = '';
  producto: Number = 0;
  productosId: Array<any> = [];

  agregar: Boolean = false;
  titulo_model: String = '';

  entradaPortada: String = '';

  btnBorrarPortada: Boolean = false;

  contenedorImgCategorias: any = {};
  contenedorImgCategoriasActualizada: any = {};

  permisos: any = {}

  visibleRepetido: boolean = false;
  visibleFallo: boolean = false;
  position: string = "middle-center";

  todosImagenes() {
    this.visibleFallo = false
    this.visibleRepetido = false
    this.imagenService.getImagenes().subscribe(
      (response: any) => {
        this.tempImagenes = response;
        for (let i = 0; i < this.tempImagenes.length; i++) {
          if (i >= 0) {
            this.tempImagenes[i].acciones = this.botones;
            this.tempImagenes = [...this.tempImagenes];
          }
        }

        this.imagenes = response;
        this.imagenes = [...this.imagenes];
        this.permisosAcciones()
      },
      (error) => {
        console.log(error);
      }
    );

    this.ProductosService.getProductos().subscribe(
      (response: any) => {
        this.productosId = response.map((item: { id: any; nombre: any; }) => ({ id: item.id, nombre: item.nombre }));
        
      },
      (error) => {
        console.log(error);
      }
    );
  }

  getProductoNombre(id: any): string {
    const Producto = this.productosId.find((item: { id: any; }) => item.id === id);
    return Producto ? Producto.nombre : '';
  }

  permisosAcciones(){
    const modulo: any = localStorage.getItem('persona_email')

    this.RolPermisosService.obtenerPermisos('imagen', modulo).subscribe(
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
    this.todosImagenes();
  }
  
  accionesClick(cell: any, rowIndex: any, item: any) {
    switch (item) {
      case 'Leer':
        this.l = true;
        this.a = false;
        this.b = false;
        this.titulo_model = 'Datos Imagen';
        this.id = this.imagenes[rowIndex].id;
        this.nombre = this.imagenes[rowIndex].nombre;
        this.url =
        '../../../../assets/images/' + this.imagenes[rowIndex].url;
        this.producto = this.imagenes[rowIndex].producto_id;
        break;
      case 'Actualizar':
        this.l = false;
        this.a = true;
        this.b = false;
        this.titulo_model = 'Actualizar Imagen';
        this.nombre = this.imagenes[rowIndex].nombre;
        this.formulario.controls['id'].setValue(this.imagenes[rowIndex].id);
        this.formulario.controls['nombre'].setValue(this.imagenes[rowIndex].nombre);
        // this.formulario.controls['url'].setValue(this.imagenes[rowIndex].url);
        this.formulario.controls['producto_id'].setValue(this.imagenes[rowIndex].producto_id);

        if (this.imagenes[rowIndex].url)
        this.entradaPortada = this.imagenes[rowIndex].url
        else this.entradaPortada = 'logoeco.png'
        
        this.cambiarPortada(this.entradaPortada, false);

        break;
      case 'Borrar':
        this.l = false;
        this.a = false;
        this.b = true;
        this.titulo_model = 'Borrar Imagen';
        this.id = this.imagenes[rowIndex].id;
        this.nombre = this.imagenes[rowIndex].nombre;
        this.url = this.imagenes[rowIndex].url;
        break;
      case false:
        this.cambiarPortada('logoeco.png', true);
        this.agregar = true;
        this.titulo_model = 'Agregar Imagen';
        break;
      default:
        break;
    }
  }

  cambiarPortada(portada: String, cerrar: Boolean) {

    let partesRuta, nombreArchivo;
    if (portada && !cerrar) {
      partesRuta = portada.split('\\');
      nombreArchivo = partesRuta[partesRuta.length - 1];
      this.btnBorrarPortada = false;
    } else if (portada && cerrar) {
      nombreArchivo = 'logoeco.png';
    }
    Object.assign(this.contenedorImgCategorias, {
      position: 'relative',
      width: '100%',
      height: '30vh',
      margin: '0 0 1rem 0',
      background:
        'url(../../../../assets/images/' +
        nombreArchivo +
        ') center center / contain no-repeat',
    });
    this.imagen.url = nombreArchivo;
  }

  addImagen() {
    let partesRuta;
    let imagenNombre = {}
    this.imagen.nombre = this.formulario.get('nombre')?.value;
    this.imagen.url = this.formulario.get('url')?.value;
    this.imagen.producto_id = this.formulario.get('producto_id')?.value;
    imagenNombre = this.imagenes.find((imagen: { nombre: any; }) => 
      imagen.nombre === this.imagen.nombre
    );

    if (this.imagen.url) {
      partesRuta = this.imagen.url.split('\\');
      this.imagen.url = partesRuta[partesRuta.length - 1];
    }else{
      this.imagen.url = 'logoeco.png';
    }

    this.formulario.get('url')?.setValue(null);
    
    this.agregar = false;

    if (!imagenNombre) {
      this.imagenService.createImagen(this.imagen).subscribe(
        (response: any) => {
          this.agregar = false;
          this.imagen = {};
          this.formulario.reset();
          this.todosImagenes();
        },
        (error) => {
          console.log(error);
          this.visibleFallo = !this.visibleFallo
          setTimeout(() => {
            this.todosImagenes();
          }, 3000);
        });
      }else{
        this.visibleRepetido = !this.visibleRepetido
        setTimeout(() => {
          this.todosImagenes();
        }, 3000);
      }
  }

  updateImagen() {
    let partesRuta;
    let tipoNombre = {nombre: ''}
    let nombreTipo = ''
    let actualiza = true;
    this.imagen.id = this.formulario.get('id')?.value;
    this.imagen.nombre = this.formulario.get('nombre')?.value;
    this.imagen.producto_id = this.formulario.get('producto_id')?.value;
    tipoNombre = this.imagenes.find(imagen => imagen.nombre === this.imagen.nombre); 
    if (tipoNombre) nombreTipo = tipoNombre.nombre
  
    this.imagenes.forEach(e => {
      if (e.nombre == nombreTipo && nombreTipo != this.nombre) {
        actualiza = false
        this.visibleRepetido = !this.visibleRepetido
        setTimeout(() => {
          this.todosImagenes();
        }, 3000);
        }
    });
    
    if (this.imagen.url) {
      partesRuta = this.imagen.url.split('\\');
      this.imagen.url = partesRuta[partesRuta.length - 1];
    }else{
      this.imagen.url = 'logoeco.png';
    }
    
    if (actualiza) {
      this.imagenService.actualizarImagen(this.imagen).subscribe(
        (response: any) => {
          this.imagen = {};
          this.todosImagenes();
          this.a = !this.a;
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }

  deleteImagen(id: Number) {
    this.imagen.id = id;
    this.imagenService.borrarImagen(this.imagen.id).subscribe(
      (response: any) => {
        this.todosImagenes();
        this.imagen = {};
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
    console.log(this.tempImagenes);
    
    const filteredData = this.tempImagenes.filter((row) => {
      return (
        row.nombre.toLowerCase().indexOf(val) !== -1 ||
        this.getProductoNombre(row.producto_id).toLowerCase().indexOf(val) !== -1
      );
    });
    // Restablece el offset de la tabla para mostrar los resultados desde el principio
    this.imagenes = filteredData;
    this.imagenes = [...this.imagenes];

    // this.mydatatable.offset = 0;
  }
}
