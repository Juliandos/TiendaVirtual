import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PersonaRolService } from '../../../services/persona-rol.service';
import { PersonasService } from '../../../services/personas.service';
import { RolService } from '../../../services/rol.service';
import { RolPermisosService } from '../../../services/rol-permisos.service';
import { ColumnMode, DatatableComponent, NgxDatatableModule } from '@swimlane/ngx-datatable';
import { Router } from '@angular/router';
import { Permiso } from 'src/app/models/Permiso.enum';

@Component({
  selector: 'app-persona-rol-crud',
  templateUrl: './persona-rol-crud.component.html',
  styleUrls: ['./persona-rol-crud.component.scss']
})
export class PersonaRolCrudComponent implements OnInit {
  @ViewChild(DatatableComponent) mydatatable: DatatableComponent | undefined;

  formulario: FormGroup

  ColumnMode = ColumnMode;

  constructor(
    private fb: FormBuilder,
    private PersonaRolService: PersonaRolService,
    private PersonasService: PersonasService,
    private RolService: RolService,
    private RolPermisosService: RolPermisosService,
    private router: Router
    ) { 
      
    const item = localStorage.getItem('logged');
    if (item == 'false') {
      this.router.navigateByUrl('/login');
    }

    this.formulario = this.fb.group({
      persona_id: [0],
      rol_id: ['', Validators.required]
    });
  }

  columns = [
    { prop: 'persona_id' },
    { prop: 'rol_id'}
  ];

  personasRol: Array<any> = [];
  personaRol_del: any = {
    persona_id: null,
    rol_id: null
  };
  persona: any = {};
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
  persona_id: Array<any> = [];
  rol_id: Array<any> = [];

  persona_id_del: Array<any> = [];
  rol_id_del: Array<any> = [];

  persona_idf: String = '';
  rol_idf: String = '';

  agregar: Boolean = false;
  titulo_model: String = '';

  id_jefe: Array<any> = [];
  id_gerente: Array<any> = [];

  alertrepeat = document.getElementsByClassName('none')

  persona_anterior: string = ''
  rol_anterior: string = ''

  permisos: any = {}

  visibleRepetido: boolean = false;
  visibleFallo: boolean = false;
  visibleNoPosible: boolean = false;
  position: string = "middle-center";

  todosPersonaRol() {
    this.visibleFallo = false
    this.visibleRepetido = false
    this.visibleNoPosible = false
    this.PersonaRolService.getPerRol().subscribe(
      (response: any) => {
        this.tempContactos = response;
        for (let i = 0; i < this.tempContactos.length; i++) {
          if (i >= 0) {
            this.tempContactos[i].acciones = this.botones;
            this.tempContactos = [...this.tempContactos];
          }
        }
        this.personasRol = response;
        this.personasRol = [...this.personasRol];
        this.permisosAcciones()
      },
      (error) => {
        console.log(error);
      }
    );

    this.PersonasService.getPersonas().subscribe(
      (response: any) => {
        this.persona_id = response.map((item: { id: any; nombre: any; }) => ({ 
          id: item.id,
          nombre: item.nombre 
        }));
      },
      (error) => {
        console.log(error);
      }
    );

    this.RolService.getRoles().subscribe(
      (response: any) => {
        this.rol_id = response.map((item: { id: any; nombre: any; }) => ({ 
          id: item.id,
          nombre: item.nombre 
        }));

        this.id_jefe = response.filter((item: { id: any; nombre: any; }) => item.nombre === 'Jefe')
        .map((item: { id: any; nombre: any; }) => item.id);

        this.id_gerente = response.filter((item: { id: any; nombre: any; }) => item.nombre === 'Gerente')
        .map((item: { id: any; nombre: any; }) => item.id);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  permisosAcciones(){
    const modulo: any = localStorage.getItem('persona_email')

    this.RolPermisosService.obtenerPermisos('persona_rol', modulo).subscribe(
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
    this.todosPersonaRol();
  }
  
  getServicioVenta(id: any): any {
    const tipoPago = this.persona_id.find((item: { id: any; }) => item.id === id);
    return tipoPago ? tipoPago.nombre : null;
  }

  getProducto(id: any): any {
    const tipoPago = this.rol_id.find((item: { id: any; }) => item.id === id);
    return tipoPago ? tipoPago.nombre : null;
  }

  accionesClick(cell: any, rowIndex: any, item: any) {
    switch (item) {
      case 'Leer':
        this.l = true;
        this.a = false;
        this.b = false;
        this.titulo_model = 'Datos Persona Rol';
        this.persona_idf = this.personasRol[rowIndex].persona_id;
        this.rol_idf = this.personasRol[rowIndex].rol_id;
        break;
      case 'Actualizar':
        this.l = false;
        this.a = true;
        this.b = false;
        this.titulo_model = 'Actualizar Persona Rol';
        this.persona_idf = this.personasRol[rowIndex].persona_id;
        this.rol_idf = this.personasRol[rowIndex].rol_id;
        this.formulario.controls['persona_id'].setValue(this.personasRol[rowIndex].persona_id);
        this.formulario.controls['rol_id'].setValue(this.personasRol[rowIndex].rol_id);
        break;
      case 'Borrar':
        this.l = false;
        this.a = false;
        this.b = true;
        this.titulo_model = 'Borrar Persona Rol';
        this.persona_id_del = this.personasRol[rowIndex].persona_id;
        this.rol_id_del = this.personasRol[rowIndex].rol_id;
        break;
      case false:
        this.agregar = true;
        this.titulo_model = 'Agregar Persona Rol';
        break;
      default:
        break;
    }
  }

  addPersonaRol() {
    let detalleNombre = {}
    this.persona.persona_id = this.formulario.get('persona_id')?.value;
    this.persona.rol_id = this.formulario.get('rol_id')?.value;
    detalleNombre = this.personasRol.find((persona: { persona_id: any, rol_id: any; }) => 
      (persona.persona_id === this.persona.persona_id && persona.rol_id === this.persona.rol_id)
    );//////
    this.persona.cantidad = this.formulario.get('cantidad')?.value;

    console.log(detalleNombre, this.personasRol, this.persona);
    

    // if (this.persona.rol_id === this.id_jefe[0] || this.persona.rol_id === this.id_gerente[0]) {
    //   const repeatelement = this.alertrepeat[1] as HTMLElement
    //   repeatelement.classList.remove('none');
    //   setTimeout(() => {
    //     repeatelement.classList.add('none');
    //   }, 3000);
    // }else{
    //   this.PersonaRolService.createPerRol(this.persona).subscribe(
    //     (response: any) => {
    //       this.agregar = false; //// Agregar mensaje confirmación por 2s, tarea
    //       this.persona = {};
    //       this.formulario.reset();
    //       this.todosPersonaRol();
    //       this.persona_id = []
    //       this.rol_id = []
    //     },
    //     (error) => {
    //       console.log(error);
    //     }
    //   );
    // }

  }

  onClickSelect(event: MouseEvent){
    const selectElement = event.target as HTMLSelectElement;
    const valorSeleccionado = selectElement.value;
    const nombreSeleccionado = selectElement.name || '';

    if (!this.persona_anterior) {
      if (nombreSeleccionado == 'persona') {
        this.persona_anterior = valorSeleccionado
      }
    }

    if (!this.rol_anterior) {
      if (nombreSeleccionado == 'rol') {
        this.rol_anterior = valorSeleccionado
      }
    }
    
    // console.log('persona', this.persona_anterior, 'rol',this.rol_anterior);
  }

  updateDetalle() {
    this.persona.nuevo_persona_id = this.formulario.get('persona_id')?.value;
    this.persona.nuevo_rol_id = this.formulario.get('rol_id')?.value;
    this.persona.persona_anterior_id = this.persona_anterior;
    this.persona.rol_anterior_id = this.rol_anterior;

    if (!this.persona.persona_anterior_id) {
      this.persona.persona_anterior_id = this.formulario.get('persona_id')?.value
    }else{
      this.persona.persona_anterior_id = parseInt(this.persona.persona_anterior_id.split(":")[1].trim());
    }

    if (!this.persona.rol_anterior_id) {
    this.persona.rol_anterior_id = this.formulario.get('rol_id')?.value
    }else{
      this.persona.rol_anterior_id = parseInt(this.persona.rol_anterior_id.split(":")[1].trim());
    }

    this.PersonaRolService.actualizarPerRol(this.persona).subscribe(
      (response: any) => {
        this.persona_anterior = ''
        this.rol_anterior = ''
        this.persona = {};
        this.todosPersonaRol();
        this.a = !this.a;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  deleteDetalle() {
    
    this.PersonaRolService.borrarPerRol(this.persona_id_del, this.rol_id_del).subscribe(
      (response: any) => {
        this.personaRol_del = {};
        this.todosPersonaRol();
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
        this.getServicioVenta(row.persona_id).toLowerCase().indexOf(val) !== -1 ||
        this.getProducto(row.rol_id).toLowerCase().indexOf(val) !== -1 
      );
    });
    // Restablece el offset de la tabla para mostrar los resultados desde el principio
    this.personasRol = filteredData;
    this.personasRol = [...this.personasRol];

    // this.mydatatable.offset = 0;
  }
}
