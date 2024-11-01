import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { PublicacionService } from '../../../services/publicacion.service';
import { RolPermisosService } from '../../../services/rol-permisos.service';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { Router } from '@angular/router';
import { Permiso } from 'src/app/models/Permiso.enum';

@Component({
  selector: 'app-publicacion-crud',
  templateUrl: './publicacion-crud.component.html',
  styleUrls: ['./publicacion-crud.component.scss']
})
export class PublicacionCrudComponent implements OnInit{
  formulario: FormGroup

  ColumnMode = ColumnMode;

  constructor(
    private fb: FormBuilder,
    private PublicacionService: PublicacionService,
    private RolPermisosService: RolPermisosService,
    private router: Router  
    ) { 

    const item = localStorage.getItem('logged');
    if (item == 'false') {
      this.router.navigateByUrl('/login');
    }
      
    this.formulario = this.fb.group({
      id: [0],
      titulo: ['', Validators.required],
      contenido: ['', [Validators.required, Validators.minLength(5)]],
      portada: ['', [Validators.required]],
      status: [1, Validators.required],
    });
  }

  publicaciones: Array<any> = [];
  publicacion: any = {};
  tempPublicaciones: Array<any> = [];

  columns = [
    { prop: 'id' },
    { prop: 'titulo'},
    { prop: 'contenido'},
    { prop: 'status'},
    { prop: 'portada'}
  ];

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
  titulo: String = '';
  contenido: String = '';
  status: Boolean = false;
  estadoSelect: Number = 0;
  portada: String = '';

  agregar: Boolean = false;
  titulo_model: String = '';
  ejemplo: any;

  entradaCategoria: string = '';
  entradaDescripcion: string = '';
  entradaEstado: Number = 0;
  entradaPortada: String = '';
  btnBorrarPortada: Boolean = false;

  contenedorImgCategorias: any = {};
  contenedorImgCategoriasActualizada: any = {};

  permisos: any = {}

  visibleRepetido: boolean = false;
  visibleFallo: boolean = false;
  position: string = "middle-center";

  todasPublicaciones() {
    this.visibleFallo = false
    this.visibleRepetido = false
    this.PublicacionService.getPublicaciones().subscribe(
      (response: any) => {
        this.tempPublicaciones = response;
        for (let i = 0; i < this.tempPublicaciones.length; i++) {
          if (i >= 0) {
            this.tempPublicaciones[i].acciones = this.botones;
            this.tempPublicaciones = [...this.tempPublicaciones];
          }
        }

        this.publicaciones = response;
        this.publicaciones = [...this.publicaciones];
        this.permisosAcciones()
      },
      (error) => {
        console.log(error);
      }
    );
  }

  permisosAcciones(){
    const modulo: any = localStorage.getItem('persona_email')

    this.RolPermisosService.obtenerPermisos('publicacion', modulo).subscribe(
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

  addPublicacion() {
    let partesRuta;
    let publicacionTitulo = {}
    this.publicacion.titulo = this.formulario.get('titulo')?.value;
    this.publicacion.contenido = this.formulario.get('contenido')?.value;
    this.publicacion.status = this.formulario.get('status')?.value;
    this.publicacion.portada = this.formulario.get('imagen')?.value;
    publicacionTitulo = this.publicaciones.find((publicacion: { titulo: any; }) => 
      publicacion.titulo === this.publicacion.titulo
    );
    this.agregar = false;
    if (this.publicacion.portada) {
      partesRuta = this.publicacion.portada.split('\\');
      this.publicacion.portada = partesRuta[partesRuta.length - 1];
    }else{
      this.publicacion.portada = 'logoeco.png';
    }

    this.formulario.get('imagen')?.setValue(null);

    if (!publicacionTitulo) {
      this.PublicacionService.createPublicacion(this.publicacion).subscribe(
        (response: any) => {
          this.agregar = false; //// Agregar mensaje confirmación por 2s, tarea
          this.publicacion = {};
          this.formulario.reset();
          this.todasPublicaciones();
        },
        (error) => {
          console.log(error);
          this.visibleFallo = !this.visibleFallo
          setTimeout(() => {
            this.todasPublicaciones();
          }, 3000);
        });
      }else{
        this.visibleRepetido = !this.visibleRepetido
        setTimeout(() => {
          publicacionTitulo = {}
          this.todasPublicaciones();
        }, 3000);
      }
  }

  updatePublicaion(event: any) {
    let partesRuta;
    let publicacionTitulo = {titulo: ''}
    let nombrePublicacion = ''
    let actualiza = true;
    this.publicacion.id = this.formulario.get('id')?.value;
    this.publicacion.titulo = this.formulario.get('titulo')?.value;
    this.publicacion.contenido = this.formulario.get('contenido')?.value;
    this.publicacion.status = this.formulario.get('status')?.value;
    this.publicacion.portada = this.formulario.get('portada')?.value;

    publicacionTitulo = this.publicaciones.find(publicacion => publicacion.titulo === this.publicacion.titulo); 
    if (publicacionTitulo) nombrePublicacion = publicacionTitulo.titulo
  
    this.publicaciones.forEach(e => {
      if (e.titulo == nombrePublicacion && nombrePublicacion != this.titulo) {
        actualiza = false
        this.visibleRepetido = !this.visibleRepetido
        setTimeout(() => {
          this.todasPublicaciones();
        }, 3000);
        }
    });

    if (this.publicacion.portada) {
      partesRuta = this.publicacion.portada.split('\\');
      this.publicacion.portada = partesRuta[partesRuta.length - 1];
    }else{
      this.publicacion.portada = this.entradaPortada;
    }

    if (this.publicacion.status) 
      this.publicacion.status = 1
    else 
      this.publicacion.status = 0
    

    if (actualiza) {
      this.PublicacionService.actualizarPublicacion(this.publicacion).subscribe(
        (response: any) => {
          this.publicacion = {};
          this.todasPublicaciones();
          this.a = !this.a;
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }

  deletePublicacion(id: Number) {
    this.publicacion.id = id;
    this.PublicacionService.borrarPublicacion(this.publicacion.id).subscribe(
      (response: any) => {
        this.todasPublicaciones();
        this.b = !this.b
      },
      (error) => {
        console.log(error);
      }
    );
  }

  ngOnInit() {
    this.todasPublicaciones();
  }

  updateFilter(event: any): void {
    const val = event.target.value.toLowerCase();
    const filteredData = this.tempPublicaciones.filter((row) => {
      return (
        row.titulo.toLowerCase().indexOf(val) !== -1 ||
        row.contenido.toLowerCase().indexOf(val) !== -1 ||
        (row.status ? 'Activo' : 'Inactivo').toLowerCase().indexOf(val) !== -1 
      );
    });
    this.publicaciones = filteredData;
    this.publicaciones = [...this.publicaciones];
  }

  accionesClick(cell: any, rowIndex: any, item: any) {
    switch (item) {
      case 'Leer':
        this.l = true;
        this.a = false;
        this.b = false;
        this.titulo_model = 'Datos Categoria';
        this.id = this.publicaciones[rowIndex].id;
        this.titulo = this.publicaciones[rowIndex].titulo;
        this.contenido = this.publicaciones[rowIndex].contenido;
        if (this.publicaciones[rowIndex].status) 
        this.status = true;
        else this.status = false;
        this.portada =
          '../../../../assets/images/' + this.publicaciones[rowIndex].portada;
        break;
      case 'Actualizar':
        this.l = false;
        this.a = true;
        this.b = false;
        this.titulo_model = 'Actualizar Categoria';
        // this.nombre = this.publicaciones[rowIndex].nombre;
        this.titulo = this.publicaciones[rowIndex].titulo;
        this.formulario.controls['id'].setValue(this.publicaciones[rowIndex].id);
        this.formulario.controls['titulo'].setValue(this.publicaciones[rowIndex].titulo);
        this.formulario.controls['contenido'].setValue(this.publicaciones[rowIndex].contenido);
        if (this.publicaciones[rowIndex].status) this.formulario.controls['status'].setValue(true);
        else this.formulario.controls['status'].setValue(false);

        if (this.publicaciones[rowIndex].portada)
        this.entradaPortada = this.publicaciones[rowIndex].portada
        else this.entradaPortada = 'logoeco.png'
        
        this.cambiarPortada(this.entradaPortada, false);
        break;
      case 'Borrar':
        this.l = false;
        this.a = false;
        this.b = true;
        this.titulo_model = 'Borrar Categoria';
        this.id = this.publicaciones[rowIndex].id;
        this.titulo = this.publicaciones[rowIndex].nombre;
        this.contenido = this.publicaciones[rowIndex].descripcion;
        break;
      case false:
        this.cambiarPortada('logoeco.png', true);
        this.btnBorrarPortada = false;
        this.agregar = true;
        this.titulo_model = 'Agregar Categoria';
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
    this.publicacion.portada = nombreArchivo;
  }
}
