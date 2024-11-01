import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { RolService } from '../../../services/rol.service';
import { RolPermisosService } from '../../../services/rol-permisos.service';
import { ColumnMode, DatatableComponent } from '@swimlane/ngx-datatable';
import { Router } from '@angular/router';
import { Permiso } from 'src/app/models/Permiso.enum';

@Component({
  selector: 'app-rol-crud',
  templateUrl: './rol-crud.component.html',
  styleUrls: ['./rol-crud.component.scss']
})
export class RolCrudComponent implements OnInit  {
  @ViewChild(DatatableComponent) mydatatable: DatatableComponent | undefined;

  formulario: FormGroup

  ColumnMode = ColumnMode;

  constructor(
    private fb: FormBuilder,
    private RolPermisosService: RolPermisosService,
    private RolService: RolService,
    private router: Router
    ) { 
      
    const item = localStorage.getItem('logged');
    if (item == 'false') {
      this.router.navigateByUrl('/login');
    }

    this.formulario = this.fb.group({
      id: [0],
      nombre: ['', Validators.required],
      descripcion: ['', [Validators.required, Validators.minLength(5)]],
      status: [1, Validators.required]
    });
  }

  roles: Array<any> = [];
  rol: any = {};
  tempRoles: Array<any> = [];

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
  status: Boolean = false;
  statusSelect: Number = 0;
  portada: String = '';

  agregar: Boolean = false;
  titulo_model: String = '';
  ejemplo: any;

  entradaCategoria: string = '';
  entradaDescripcion: string = '';
  entradastatus: Number = 0;
  entradaPortada: String = '';
  btnBorrarPortada: Boolean = false;

  contenedorImgCategorias: any = {};
  contenedorImgCategoriasActualizada: any = {};

  permisos: any = {}

  visibleRepetido: boolean = false;
  visibleFallo: boolean = false;
  position: string = "middle-center";

  todosRol() {
    this.visibleRepetido = false;
    this.visibleFallo = false;
    this.RolService.getRoles().subscribe(
      (response: any) => {
        this.tempRoles = response;
        for (let i = 0; i < this.tempRoles.length; i++) {
          if (i >= 0) {
            this.tempRoles[i].acciones = this.botones;
            this.tempRoles = [...this.tempRoles];
          }
        }

        this.roles = response;
        this.roles = [...this.roles];
        this.permisosAcciones()
      },
      (error) => {
        console.log(error);
      }
    );

  }

  permisosAcciones(){
    const modulo: any = localStorage.getItem('persona_email')

    this.RolPermisosService.obtenerPermisos('rol', modulo).subscribe(
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

  addRol() {
    let partesRuta;
    let rolNombre = {}
    this.rol.nombre = this.formulario.get('nombre')?.value;
    rolNombre = this.roles.find(rol => rol.nombre === this.rol.nombre); 
    this.rol.descripcion = this.formulario.get('descripcion')?.value;
    this.rol.status = this.formulario.get('status')?.value;
    this.agregar = false;

    if (this.rol.portada) {
      partesRuta = this.rol.portada.split('\\');
      this.rol.portada = partesRuta[partesRuta.length - 1];
    }else{
      this.rol.portada = 'logoeco.png';
    }

    this.formulario.get('imagen')?.setValue(null);

    if (!rolNombre) {
      this.RolService.createRol(this.rol).subscribe(
        (response: any) => {
          this.agregar = false; //// Agregar mensaje confirmación por 2s, tarea
          this.rol = {};
          this.formulario.reset();
          this.todosRol();
        },
        (error) => {
          console.log(error);
          this.visibleFallo = !this.visibleFallo
          setTimeout(() => {
            this.todosRol();
          }, 3000);
        });
    }else{
      this.visibleRepetido = !this.visibleRepetido
      setTimeout(() => {
        this.todosRol();
      }, 3000);
    }
  }

  updateRol(event: any) {
    let partesRuta;
    let rolNombre = {nombre: ''}
    let nombreRol = ''
    let actualiza = true;
    this.rol.id = this.formulario.get('id')?.value;
    this.rol.nombre = this.formulario.get('nombre')?.value;
    rolNombre = this.roles.find(rol => rol.nombre === this.rol.nombre); 
      if (rolNombre) nombreRol = rolNombre.nombre
    this.rol.descripcion = this.formulario.get('descripcion')?.value;
    this.rol.status = this.formulario.get('status')?.value;
    // this.rol.portada = this.formulario.controls['imagen'].value;

    // console.log(this.formulario.controls['imagen'].value);
    
    if (this.rol.portada) {
      
      partesRuta = this.rol.portada.split('\\');
      this.rol.portada = partesRuta[partesRuta.length - 1];
    }else{
      this.rol.portada = this.entradaPortada;
    }

    if (this.rol.status) 
      this.rol.status = 1
    else 
      this.rol.status = 0
    
    this.roles.forEach(e => {
      if (e.nombre == nombreRol && nombreRol != this.nombre) {
        actualiza = false
        this.visibleRepetido = !this.visibleRepetido
        setTimeout(() => {
          this.todosRol();
        }, 3000);
        }
    });
    
    if (actualiza) {
      this.RolService.actualizarRol(this.rol).subscribe(
        (response: any) => {
          this.rol = {};
          this.todosRol();
          this.a = !this.a;
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }

  deleteRol(id: Number) {
    this.rol.id = id;
    this.RolService.borrarRol(this.rol.id).subscribe(
      (response: any) => {
        this.todosRol();
        this.b = !this.b
      },
      (error) => {
        console.log(error);
      }
    );
  }

  ngOnInit() {
    this.todosRol();
  }

  updateFilter(event: any): void {
    const val = event.target.value.toLowerCase();
    const filteredData = this.tempRoles.filter((row) => {
      return (
        row.nombre.toLowerCase().indexOf(val) !== -1 ||
        row.descripcion.toLowerCase().indexOf(val) !== -1
      );
    });
    this.roles = filteredData;
    this.roles = [...this.roles];
  }

  accionesClick(cell: any, rowIndex: any, item: any) {
    switch (item) {
      case 'Leer':
        this.l = true;
        this.a = false;
        this.b = false;
        this.titulo_model = 'Datos Categoria';
        this.id = this.roles[rowIndex].id;
        this.nombre = this.roles[rowIndex].nombre;
        this.descripcion = this.roles[rowIndex].descripcion;
        if (this.roles[rowIndex].status) 
        this.status = true;
        else this.status = false;
        this.portada =
          '../../../../assets/images/' + this.roles[rowIndex].portada;
        break;
      case 'Actualizar':
        this.l = false;
        this.a = true;
        this.b = false;
        this.titulo_model = 'Actualizar Categoria';
        // this.nombre = this.roles[rowIndex].nombre;
        this.formulario.controls['id'].setValue(this.roles[rowIndex].id);
        this.formulario.controls['nombre'].setValue(this.roles[rowIndex].nombre);
        this.formulario.controls['descripcion'].setValue(this.roles[rowIndex].descripcion);
        if (this.roles[rowIndex].status) this.formulario.controls['status'].setValue(true);
        else this.formulario.controls['status'].setValue(false);

        if (this.roles[rowIndex].portada)
        this.entradaPortada = this.roles[rowIndex].portada
        else this.entradaPortada = 'logoeco.png'
        
        this.cambiarPortada(this.entradaPortada, false);
        break;
      case 'Borrar':
        this.l = false;
        this.a = false;
        this.b = true;
        this.titulo_model = 'Borrar Categoria';
        this.id = this.roles[rowIndex].id;
        this.nombre = this.roles[rowIndex].nombre;
        this.descripcion = this.roles[rowIndex].descripcion;
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
    this.rol.url = nombreArchivo;
  }
}
