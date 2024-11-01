import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { CategoriasService } from '../../../services/categorias.service';
import { RolPermisosService } from '../../../services/rol-permisos.service';
import { ColumnMode, DatatableComponent } from '@swimlane/ngx-datatable';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

import { Permiso } from '../../../models/Permiso.enum';

@Component({
  selector: 'app-categoria-crud',
  templateUrl: './categoria-crud.component.html',
  styleUrls: ['./categoria-crud.component.scss'],
})
export class CategoriaCRUDComponent implements OnInit {
  @ViewChild(DatatableComponent) mydatatable: DatatableComponent | undefined;
  @ViewChild('staticBackdropModal', { static: true }) staticBackdropModal: ElementRef | undefined;

  formulario: FormGroup;

  ColumnMode = ColumnMode;

  modalContent: string = "Woohoo, you're reading this text in a modal!";
  private modalRef: NgbModalRef | undefined;

  base64Output: string = '';

  constructor(
    private fb: FormBuilder,
    private RolPermisosService: RolPermisosService,
    private CategoriasService: CategoriasService,
    private router: Router,
    private modalService: NgbModal
  ) {
    const item = localStorage.getItem('logged');
    if (item == 'false') {
      this.router.navigateByUrl('/login');
    }

    this.formulario = this.fb.group({
      id: [0],
      nombre: ['', Validators.required],
      descripcion: ['', [Validators.required, Validators.minLength(5)]],
      estado: [1, Validators.required],
      imagen: ['', [Validators.required]],
    });
  }

  categorias: Array<any> = [];
  categoria: any = {};
  tempCategorias: Array<any> = [];

  columns = [
    { name: 'Id', prop: 'Id' },
    { name: 'Nombre', prop: 'Nombre' },
    { name: 'Descripción', prop: 'Descripción' },
    { name: 'Acciones', prop: 'Acciones' },
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
  nombre: String = '';
  descripcion: String = '';
  estado: Boolean = false;
  estadoSelect: Number = 0;
  portada : string | ArrayBuffer | null = null;

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
  permisosCRUD: any = {}
  rol_id: Array<any> = [];
  rol_modulo_id: Array<any> = [];

  tempPersonasRol: Array<any> = [];
  personasRoles: Array<any> = [];

  visibleRepetido: boolean = false;
  visibleFallo: boolean = false;
  position: string = "middle-center";

  todascategorias() {
    this.visibleRepetido = false;
    this.visibleFallo = false;
    this.CategoriasService.getCategorias().subscribe(
      (response: any) => {
        this.tempCategorias = response;
        for (let i = 0; i < this.tempCategorias.length; i++) {
          if (i >= 0) {
            this.tempCategorias[i].acciones = this.botones;
            this.tempCategorias = [...this.tempCategorias];
          }
        }
        this.categorias = response;
        this.categorias = [...this.categorias];
        this.permisosAcciones();
      },
      (error) => {
        console.log(error);
      }
    );

    
  }

  permisosAcciones(){
    const modulo: any = localStorage.getItem('persona_email')

    this.RolPermisosService.obtenerPermisos('categoria', modulo).subscribe(
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

  getRol(id: any): any {
    const tipoPago = this.rol_id.find((item: { id: any; }) => item.id === id);
    return tipoPago ? tipoPago.nombre : null;
  }

  getCRUD(id: any, tipo: any): any {
    const permiso = this.permisosCRUD.find((item: { id: any }) => item.id === id);
    return permiso ? permiso[tipo] : null;
  }

  getModulo(id: any): any {
    if (typeof id === 'number') {
      const permiso = this.permisosCRUD.find((item: { id: any }) => item.id === id);
      const modulo_name = this.rol_modulo_id.find((item: { id: any }) => item.id === permiso.modulo_id);
  
      return modulo_name ? modulo_name.nombre : null;
    }else{
      const modulo_name = this.rol_modulo_id.find((item: { nombre: any }) => item.nombre === id);
      
      return modulo_name ? modulo_name.id : null;
    }
  }

  addCategoria() {
    let categoriaNombre = {}
    let partesRuta;
    this.categoria.nombre = this.formulario.get('nombre')?.value;
    
    categoriaNombre = this.categorias.find(categoria => categoria.nombre === this.categoria.nombre); 
    
    this.categoria.descripcion = this.formulario.get('descripcion')?.value;
    this.categoria.estado = this.formulario.get('estado')?.value;
    this.categoria.portada = this.formulario.get('imagen')?.value;
    this.agregar = false;

    if (this.categoria.portada) {
      partesRuta = this.categoria.portada.split('\\');
      this.categoria.portada = partesRuta[partesRuta.length - 1];
    } else {
      this.categoria.portada = 'logoeco.png';
    }
    this.formulario.get('imagen')?.setValue(null);

    this.categoria.portadaBase64 = this.base64Output;
    
    if (!categoriaNombre) {
      this.CategoriasService.createCategoria(this.categoria).subscribe(
      (response: any) => {
        this.agregar = false; //// Agregar mensaje confirmación por 2s, tarea
        this.categoria = {};
        this.formulario.reset();
        this.todascategorias();
      },
      (error) => {
        console.log(error);
        this.visibleFallo = !this.visibleFallo
        setTimeout(() => {
          this.todascategorias();
        }, 3000);
      });
    }else{
      this.visibleRepetido = !this.visibleRepetido
      setTimeout(() => {
        this.todascategorias();
      }, 3000);
    }
  }

  updateCategoria(event: any) {

    let partesRuta;
    let categoriaNombre = {nombre: ''}
    let nombreCategoria = ''
    let actualiza = true;
    this.categoria.id = this.formulario.get('id')?.value;
    this.categoria.nombre = this.formulario.get('nombre')?.value;
    categoriaNombre = this.categorias.find(categoria => categoria.nombre === this.categoria.nombre); 
      if (categoriaNombre) nombreCategoria = categoriaNombre.nombre
    this.categoria.descripcion = this.formulario.get('descripcion')?.value;
    this.categoria.estado = this.formulario.get('estado')?.value;
    
    if (this.categoria.portada) {
      partesRuta = this.categoria.portada.split('\\');
      this.categoria.portada = partesRuta[partesRuta.length - 1];
    } else 
      this.categoria.portada = this.entradaPortada;
    
    if (this.categoria.estado) this.categoria.estado = 1;
    else this.categoria.estado = 0;
    
    this.categorias.forEach(e => {
      if (e.nombre == nombreCategoria && nombreCategoria != this.nombre) {
        actualiza = false
        this.visibleRepetido = !this.visibleRepetido
        setTimeout(() => {
          this.todascategorias();
        }, 3000);
        }
    });

    if (actualiza) {
      this.CategoriasService.actualizarCategoria(this.categoria).subscribe(
        (response: any) => {
          this.categoria = {};
          this.todascategorias();
          this.a = !this.a;
        },
        (error) => {
          console.log(error);
        }
      );
    }

  }

  deleteCategoria(id: Number) {
    this.categoria.id = id;
    this.CategoriasService.borrarCategoria(this.categoria.id).subscribe(
      (response: any) => {
        this.todascategorias();
        this.b = !this.b;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  unacategoria(categoria: number) {
    this.CategoriasService.getCategoria(categoria).subscribe(
      (response: any) => {
        // console.log(response.portada);
        return response;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  ngOnInit() {
    this.todascategorias();
  }

  updateFilter(event: any): void {
    const val = event.target.value.toLowerCase();
    // Filtra los datos de acuerdo con la cadenvala
    const filteredData = this.tempCategorias.filter((row) => {
      return (
        row.nombre.toLowerCase().indexOf(val) !== -1 ||
        row.descripcion.toLowerCase().indexOf(val) !== -1
      );
    });
    // Restablece el offset de la tabla para mostrar los resultados desde el principio
    this.categorias = filteredData;
    this.categorias = [...this.categorias];

    // this.mydatatable.offset = 0;
  }

  accionesClick(cell: any, rowIndex: any, item: any) {
    switch (item) {
      case 'Leer':
        this.l = true;
        this.a = false;
        this.b = false;
        this.titulo_model = 'Datos Categoria';
        this.id = this.categorias[rowIndex].id;
        this.nombre = this.categorias[rowIndex].nombre;
        this.descripcion = this.categorias[rowIndex].descripcion;
        if (this.categorias[rowIndex].estado) this.estado = true;
        else this.estado = false;
        this.portada =
          '../../../../assets/images/' + this.categorias[rowIndex].portada;
        break;
      case 'Actualizar':
        this.l = false;
        this.a = true;
        this.b = false;
        this.titulo_model = 'Actualizar Categoria';
        this.nombre = this.categorias[rowIndex].nombre;
        this.formulario.controls['id'].setValue(this.categorias[rowIndex].id);
        this.formulario.controls['nombre'].setValue(
          this.categorias[rowIndex].nombre
        );
        this.formulario.controls['descripcion'].setValue(
          this.categorias[rowIndex].descripcion
        );
        if (this.categorias[rowIndex].estado)
          this.formulario.controls['estado'].setValue(true);
        else this.formulario.controls['estado'].setValue(false);

        if (this.categorias[rowIndex].portada)
          this.entradaPortada = this.categorias[rowIndex].portada;
        else this.entradaPortada = 'logoeco.png';

        this.cambiarPortada(null, this.entradaPortada, false);
        break;
      case 'Borrar':
        this.l = false;
        this.a = false;
        this.b = true;
        this.titulo_model = 'Borrar Categoria';
        this.id = this.categorias[rowIndex].id;
        this.nombre = this.categorias[rowIndex].nombre;
        this.descripcion = this.categorias[rowIndex].descripcion;
        break;
      case false:
        this.cambiarPortada(null, 'logoeco.png', true);
        this.btnBorrarPortada = false;
        this.agregar = true;
        this.titulo_model = 'Agregar Categoria';
        break;
      default:
        break;
    }
  }

  cambiarPortada(event: any, portada: String, cerrar: Boolean) {
    let partesRuta, nombreArchivo;
    if (portada && !cerrar) {
      partesRuta = portada.split('\\'); //fakefoto/asdñkf/abrigo.jpg
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
    this.categoria.portada = nombreArchivo;

    if (event) {
      this.generarBase64(event);
    }
  }

  generarBase64(event: any) {
    const file: File = event.target.files[0];
    
    if (file) {
      const reader = new FileReader();
      
      // Se ejecuta cuando la lectura del archivo es exitosa
      reader.onload = () => {
        this.base64Output = reader.result as string;
        this.base64Output = this.base64Output.split(',')[1];
        
        this.portada = reader.result;
      };

      // Leer el archivo como una URL de datos (Base64)
      reader.readAsDataURL(file);
    }
  }
}
