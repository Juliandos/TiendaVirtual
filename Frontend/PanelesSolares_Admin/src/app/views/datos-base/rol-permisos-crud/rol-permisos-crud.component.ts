import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RolPermisosService } from '../../../services/rol-permisos.service';
import { RolService } from '../../../services/rol.service';
import { PermisosService } from '../../../services/permisos.service';
import { ModuloService } from '../../../services/modulo.service';
import { PersonasService } from '../../../services/personas.service';
import { PersonaRolService } from '../../../services/persona-rol.service';
import { ColumnMode, DatatableComponent, NgxDatatableModule } from '@swimlane/ngx-datatable';
import { Router } from '@angular/router';
import { Permiso } from 'src/app/models/Permiso.enum';

@Component({
  selector: 'app-rol-permisos-crud',
  templateUrl: './rol-permisos-crud.component.html',
  styleUrls: ['./rol-permisos-crud.component.scss']
})
export class RolPermisosCrudComponent implements OnInit {
  @ViewChild(DatatableComponent) mydatatable: DatatableComponent | undefined;

  formulario: FormGroup

  ColumnMode = ColumnMode;

  constructor(
    private fb: FormBuilder,
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
        rol_id: [0],
        r: [false, Validators.required],
        w: [false, Validators.required],
        u: [false, Validators.required],
        d: [false, Validators.required],
        modulo_id: ['', Validators.required],
        permisos_todos: [this.permisos_todos, Validators.required]
      });
  }

  columns = [
    { prop: 'rol_id' },
    { prop: 'r'},
    { prop: 'w'},
    { prop: 'u'},
    { prop: 'd'},
    { prop: 'modulo_id'},
  ];

  personasRoles: Array<any> = [];
  personasRol_del: any = {
    rol_id: null,
    permisos_id: null
  };
  personasRol: any = {};
  tempPersonasRol: Array<any> = [];
  persona: Array<any> = [];
  crearPermisos: Array<any> = [];

  permisosEnum = Permiso;
  botones = [
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

  rol_id: Array<any> = [];
  rol_modulo_id: Array<any> = [];
  permisos_id: Array<any> = [];

  rol_id_del: String = '';
  rol_id_sel: Number = 0;

  permisos_id_lectura: any = {};
  cantidad: String = '';

  agregar: Boolean = false;
  titulo_model: String = '';
  nuevosPermisos: Array<any> = [];
  nuevoRol: number = 0

  contenedorCrear = document.getElementsByClassName('entrada-crear')
  contenedorActualizar = document.getElementsByClassName('entrada_actualizar');

  cat : any = {};
  con : any = {};
  per : any = {};
  pub : any = {};
  perm : any = {};
  rol : any = {};
  pro : any = {};
  ima : any = {};
  ser_t : any = {};
  tip : any = {};
  ser_v : any = {};
  det_v : any = {};
  r_per : any = {};
  per_r : any = {};
  mod : any = {};
  pro_cat : any = {};

  // Si se crean más módulos hay que modificar esta variable y esto no funciono, como arreglar (*)
  permisos_todos: Array<any> = [
    {
        lcategoria: false,
        ecategoria: false,
        acategoria: false,
        bcategoria: false
    },
    {
        lcontacto: false,
        econtacto: false,
        acontacto: false,
        bcontacto: false
    },
    {
        lpersona: false,
        epersona: false,
        apersona: false,
        bpersona: false
    },
    {
        lpublicacion: false,
        epublicacion: false,
        apublicacion: false,
        bpublicacion: false
    },
    {
        lpermisos: false,
        epermisos: false,
        apermisos: false,
        bpermisos: false
    },
    {
        lrol: false,
        erol: false,
        arol: false,
        brol: false
    },
    {
        lproducto: false,
        eproducto: false,
        aproducto: false,
        bproducto: false
    },
    {
        limagen: false,
        eimagen: false,
        aimagen: false,
        bimagen: false
    },
    {
        lservicio_tipo: false,
        eservicio_tipo: false,
        aservicio_tipo: false,
        bservicio_tipo: false
    },
    {
        ltipo_pago: false,
        etipo_pago: false,
        atipo_pago: false,
        btipo_pago: false
    },
    {
        lservicio_venta: false,
        eservicio_venta: false,
        aservicio_venta: false,
        bservicio_venta: false
    }
    ,
    {
        ldetalle_venta: false,
        edetalle_venta: false,
        adetalle_venta: false,
        bdetalle_venta: false
    },
    {
        lrol_permisos: false,
        erol_permisos: false,
        arol_permisos: false,
        brol_permisos: false
    },
    {
        lpersona_rol: false,
        epersona_rol: false,
        apersona_rol: false,
        bpersona_rol: false
    },
    {
        lmodulo: false,
        emodulo: false,
        amodulo: false,
        bmodulo: false
    },
    {
        lproducto_categoria: false,
        eproducto_categoria: false,
        aproducto_categoria: false,
        bproducto_categoria: false
    }
  ];

  permisoRolID : any = {};

  banderaPermiso: boolean = false;
  contador: number = 0;
  contadorPermisos: number = 0;
  personaRol: any = {}
  permisos: any = {}

  alertvacio = document.getElementsByClassName('none');

  visibleNoPermisos: boolean = false;
  visibleNoActualizar: boolean = false;
  visibleRepetido: boolean = false;
  position: string = "middle-center";

  todosPersonaRol() {
    this.visibleNoPermisos = false
    this.visibleNoActualizar = false
    this.visibleRepetido = false

    this.RolService.getRoles().subscribe(
      (response: any) => {
        this.rol_id = response.map((item: { id: any; nombre: any; }) => ({ 
          id: item.id,
          nombre: item.nombre 
        }));
      },
      (error) => {
        console.log(error);
      }
    );

    this.PermisosService.getPermisos().subscribe(
      (response: any) => {
        this.permisos_id = response
      },
      (error) => {
        console.log(error);
      }
    );

    this.ModuloService.getModulos().subscribe(
      (response: any) => {
        
        this.rol_modulo_id = response.map((item: { id: any; nombre: any; }) => ({
          id: item.id,
          nombre: item.nombre 
        }));
        
        this.onFormChange()
      },
      (error) => {
        console.log(error);
      }
    );

    this.PersonasService.getPersona(localStorage.getItem('persona_email')).subscribe(
      (response: any) => {
        
        this.PersonaRolService.getPerRolUno(response.id).subscribe(
          (response: any) => {
            
            this.RolPermisosService.getDetalles().subscribe(
              (response1: any) => {
                
                this.tempPersonasRol = response1;

                for (let i = 0; i < this.tempPersonasRol.length; i++) {
                  if (i >= 0) {
                    // if (this.getRol(response.rol_id).toLowerCase() == this.getCRUD(response1[i].permisos_id, 'rol')) {
                      this.tempPersonasRol[i].r = this.getCRUD(response1[i].permisos_id, 'r');
                      this.tempPersonasRol[i].w = this.getCRUD(response1[i].permisos_id, 'w');
                      this.tempPersonasRol[i].u = this.getCRUD(response1[i].permisos_id, 'u');
                      this.tempPersonasRol[i].d = this.getCRUD(response1[i].permisos_id, 'd');
                      this.tempPersonasRol[i].rol = this.getCRUD(response1[i].permisos_id, 'rol');
                      this.tempPersonasRol[i].modulo_id = this.getModulo(response1[i].permisos_id);
                      this.tempPersonasRol = [...this.tempPersonasRol];
                    // }
                  }
                }
                this.personasRoles = response1;
                this.personasRoles = [...this.personasRoles];
                this.permisosAcciones(response)
                
              },
              (error) => {
                console.log(error);
              }
            );
          },
          (error) => {
            console.log(error);
          }
        );
      },
      (error) => {
        console.log(error);
      }
    );
  }

  ngOnInit() {
    this.todosPersonaRol();
    this.formulario.valueChanges.subscribe((value) => {
      this.contador++
      if (this.contador <= 1) {
        this.onFormChange();
      }
    });
  }

  permisosAcciones(response: any){
    const val = this.getRol(response.rol_id).toLowerCase()
    // Filtra los datos de acuerdo con la cadenvala
    const filteredData = this.tempPersonasRol.filter((row) => {
      return (
        row.rol.toLowerCase().indexOf(val) !== -1 
        );
    });
    // console.log(filteredData);
    
    const filteredData1 = filteredData.filter((row) => {
      return (
        row.modulo_id.toLowerCase().indexOf('permiso') !== -1 
        );
    });
    // console.log(filteredData1);
    if (filteredData1[0].r) 
      this.permisos.r = filteredData1[0].r
    if(filteredData1[0].w)
      this.permisos.w = filteredData1[0].w
    if(filteredData1[0].u)
      this.permisos.u = filteredData1[0].u
    if(filteredData1[0].d)
      this.permisos.d = filteredData1[0].d
    
  }

  getRol(id: any): any {
    if (typeof id === 'number') {
      const tipoPago = this.rol_id.find((item: { id: any; }) => item.id === id);
      return tipoPago ? tipoPago.nombre : null;
    }else{
      const tipo_pago = this.rol_id.find((item: { nombre: any }) => item.nombre.toLowerCase() === id);
      
      return tipo_pago ? tipo_pago.id : null;
    }
  }

  getCRUD(id: any, tipo: any): any {
    const permiso = this.permisos_id.find((item: { id: any }) => item.id === id);
    return permiso ? permiso[tipo] : null;
  }

  getModulo(id: any): any {
    if (typeof id === 'number') {
      const permiso = this.permisos_id.find((item: { id: any }) => item.id === id);
      const modulo_name = this.rol_modulo_id.find((item: { id: any }) => item.id === permiso.modulo_id);
  
      return modulo_name ? modulo_name.nombre : null;
    }else{
      const modulo_name = this.rol_modulo_id.find((item: { nombre: any }) => item.nombre === id);
      
      return modulo_name ? modulo_name.id : null;
    }
  }

  onFormChange() {
    this.rol_modulo_id.forEach((elemento, indice) => {
      const grupoForm = document.createElement('div');
      grupoForm.classList.add('grupo-form');
      grupoForm.style.display = 'flex';
      grupoForm.style.flexDirection = 'row';
      grupoForm.style.justifyContent = 'space-between';

      ['Leer', 'Escribir', 'Actualizar', 'Borrar'].forEach(permiso => {
        const entradaPermisos = document.createElement('div');
        entradaPermisos.classList.add('entrada-permisos');
        entradaPermisos.style.display = 'flex';
        entradaPermisos.style.flexDirection = 'column';
        entradaPermisos.style.justifyContent = 'center';
        entradaPermisos.style.alignContent = 'center';
        
        const label = document.createElement('label');
        label.classList.add('etiqueta-entrada-form');
        label.textContent = permiso;
  
        const input = document.createElement('input');
        input.setAttribute('type', 'checkbox');
        if (this.permisos_id_lectura) {
          switch (permiso) {
            case 'Leer':
              input.checked = this.permisos_id_lectura.leer; 
              break;
            case 'Escribir':
              input.checked = this.permisos_id_lectura.crear; 
              break;
            case 'Actualizar':
              input.checked = this.permisos_id_lectura.actualizar; 
              break;
            case 'Borrar':
              input.checked = this.permisos_id_lectura.borrar; 
              break;
            default:
              input.checked = false
              break;
          }
        }
        input.setAttribute('formControlName', `permisos_todos[${indice}].${permiso.toLowerCase().charAt(0)}${elemento.nombre}`);
        
        input.classList.add('entrada-form');
        input.style.display = 'block';
        input.style.width = '100%';
        input.style.height = 'calc(1.5rem + 4px)';
        input.style.fontSize = '0.875rem';
        input.style.fontWeight = '400';
        input.style.color = '#495057';
        input.style.backgroundColor = '#FFF';
        input.style.border = '2px solid #ced4da';
        input.style.borderRadius = '4px';
        input.style.marginBottom = '15px';
  
        // Agregar event listener para el cambio de valor
        input.addEventListener('change', (event) => {
          const inputElement = event.target as HTMLInputElement;
          const checked = inputElement.checked;
          this.permisos_todos[indice][permiso.toLowerCase().charAt(0) + elemento.nombre] = checked;
        });
  
        entradaPermisos.appendChild(label);
        entradaPermisos.appendChild(input);
        grupoForm.appendChild(entradaPermisos);
      });
      
      const h5 = document.createElement('h6');
      h5.textContent = elemento.nombre.charAt(0).toUpperCase() + elemento.nombre.slice(1);
      h5.style.width = '20%';

      grupoForm.appendChild(h5);
      
      if (this.agregar && this.contadorPermisos <= 15) {
        const primerContenedor = this.contenedorCrear[0];
        primerContenedor.appendChild(grupoForm);
        this.contadorPermisos++
      }else if(this.a){
        const primerContenedor = this.contenedorActualizar[0];
        primerContenedor.appendChild(grupoForm);
      }
    });

  }

  accionesClick(cell: any, rowIndex: any, item: any) {
    switch (item) {
      case 'Actualizar':
        this.l = false;
        this.a = true;
        this.b = false;
        this.titulo_model = 'Actualizar Persona Rol';  
        this.rol_id_sel = this.personasRoles[rowIndex].rol_id      
        break;
      case 'Borrar':
        this.l = false;
        this.a = false;
        this.b = true;
        this.titulo_model = 'Borrar Persona Rol';  
        break;
      case false:
        this.agregar = true;
        this.titulo_model = 'Agregar Persona Rol';
        break;
      default:
        break;
    }
  }

  addPermisoRol() {
    let permisoRolNombre = {}
    this.personasRol.rol_id = this.formulario.get('rol_id')?.value;
    this.personasRol.permisos_todos = this.formulario.get('permisos_todos')?.value;
    permisoRolNombre = this.personasRoles.find((permisoRol: { rol_id: any }) => 
      (permisoRol.rol_id === this.personasRol.rol_id)
    );//////
    this.crearPermisos = []
    
    if (!this.personasRol.rol_id) {
      const repeatelement = this.alertvacio[1] as HTMLElement
      repeatelement.classList.remove('none');
      setTimeout(() => {
        repeatelement.classList.add('none');
      }, 3000);
    }else{
      if (permisoRolNombre) {
        this.visibleRepetido = !this.visibleRepetido
        setTimeout(() => {
          this.todosPersonaRol();
        }, 3000);
      }else{
        this.modificarArreglo()
        
        this.crearPermisos.forEach( (e: any, index: any) => {
          this.PermisosService.createPermiso(e).subscribe(
            (response: any) => {
              const long = this.crearPermisos.length
  
              if (index >= long-1) {
                this.agregar = !this.agregar;
                this.banderaPermiso = true
              }
  
              this.permisoRolID.rol_id = this.personasRol.rol_id
              this.permisoRolID.permiso_id = response.id;
              
              this.RolPermisosService.createDetalle(this.permisoRolID).subscribe(
                (response: any) => {
                  this.todosPersonaRol();
                  this.personasRol = {}
                },
                (error) => {
                  console.log(error);
                  this.visibleNoPermisos = !this.visibleNoPermisos
                  setTimeout(() => {
                    this.todosPersonaRol();
                  }, 3000);
                }
              );
            },
            (error) => {
              console.log(error);
            }
          );
        });
      }
    }
  }

  modificarArreglo(){
    // console.log(this.personasRol);
    
    this.personasRol.permisos_todos.forEach( (e: any, index: number) => {
      for (let clave in e) {
        switch (clave.substring(1)) {
          case 'categoria':
            switch (clave.charAt(0)) {
              case 'l':
                this.cat['r'] = e[clave]
                break;
                case 'e':
                this.cat['w'] = e[clave]
                break;
              case 'a':
                this.cat['u'] = e[clave]
                break;
              case 'b':
                this.cat['d'] = e[clave]
                break;
              default:
                break;
            }
            this.cat['rol'] = this.getRol(this.personasRol.rol_id).toLowerCase()
            this.cat['modulo_id'] = this.getModulo(clave.substring(1).toLowerCase())
            break;
          case 'contacto':
            switch (clave.charAt(0)) {
              case 'l':
                this.con['r'] = e[clave]
                break;
              case 'e':
                this.con['w'] = e[clave]
                break;
              case 'a':
                this.con['u'] = e[clave]
                break;
              case 'b':
                this.con['d'] = e[clave]
                break;
              default:
                break;
            }
            this.con['rol'] = this.getRol(this.personasRol.rol_id).toLowerCase()
            this.con['modulo_id'] = this.getModulo(clave.substring(1))
            break;
          case 'persona':
            switch (clave.charAt(0)) {
              case 'l':
                this.per['r'] = e[clave]
                break;
              case 'e':
                this.per['w'] = e[clave]
                break;
              case 'a':
                this.per['u'] = e[clave]
                break;
              case 'b':
                this.per['d'] = e[clave]
                break;
              default:
                break;
            }
            this.per['rol'] = this.getRol(this.personasRol.rol_id).toLowerCase()
            this.per['modulo_id'] = this.getModulo(clave.substring(1))
            break;
          case 'publicacion':
            switch (clave.charAt(0)) {
              case 'l':
                this.pub['r'] = e[clave]
                break;
              case 'e':
                this.pub['w'] = e[clave]
                break;
              case 'a':
                this.pub['u'] = e[clave]
                break;
              case 'b':
                this.pub['d'] = e[clave]
                break;
              default:
                break;
            }
            this.pub['rol'] = this.getRol(this.personasRol.rol_id).toLowerCase()
            this.pub['modulo_id'] = this.getModulo(clave.substring(1))
            break;
          case 'permisos':
            switch (clave.charAt(0)) {
              case 'l':
                this.perm['r'] = e[clave]
                break;
              case 'e':
                this.perm['w'] = e[clave]
                break;
              case 'a':
                this.perm['u'] = e[clave]
                break;
              case 'b':
                this.perm['d'] = e[clave]
                break;
              default:
                break;
            }
            this.perm['rol'] = this.getRol(this.personasRol.rol_id).toLowerCase()
            this.perm['modulo_id'] = this.getModulo(clave.substring(1))
            break;
          case 'rol':
            switch (clave.charAt(0)) {
              case 'l':
                this.rol['r'] = e[clave]
                break;
              case 'e':
                this.rol['w'] = e[clave]
                break;
              case 'a':
                this.rol['u'] = e[clave]
                break;
              case 'b':
                this.rol['d'] = e[clave]
                break;
              default:
                break;
            }
            this.rol['rol'] = this.getRol(this.personasRol.rol_id).toLowerCase()
            this.rol['modulo_id'] = this.getModulo(clave.substring(1))
            break;
          case 'producto':
            switch (clave.charAt(0)) {
              case 'l':
                this.pro['r'] = e[clave]
                break;
              case 'e':
                this.pro['w'] = e[clave]
                break;
              case 'a':
                this.pro['u'] = e[clave]
                break;
              case 'b':
                this.pro['d'] = e[clave]
                break;
              default:
                break;
            }
            this.pro['rol'] = this.getRol(this.personasRol.rol_id).toLowerCase()
            this.pro['modulo_id'] = this.getModulo(clave.substring(1))
            break;
          case 'imagen':
            switch (clave.charAt(0)) {
              case 'l':
                this.ima['r'] = e[clave]
                break;
              case 'e':
                this.ima['w'] = e[clave]
                break;
              case 'a':
                this.ima['u'] = e[clave]
                break;
              case 'b':
                this.ima['d'] = e[clave]
                break;
              default:
                break;
            }
            this.ima['rol'] = this.getRol(this.personasRol.rol_id).toLowerCase()
            this.ima['modulo_id'] = this.getModulo(clave.substring(1))
            break;
          case 'servicio_tipo':
            switch (clave.charAt(0)) {
              case 'l':
                this.ser_t['r'] = e[clave]
                break;
              case 'e':
                this.ser_t['w'] = e[clave]
                break;
              case 'a':
                this.ser_t['u'] = e[clave]
                break;
              case 'b':
                this.ser_t['d'] = e[clave]
                break;
              default:
                break;
            }
            this.ser_t['rol'] = this.getRol(this.personasRol.rol_id).toLowerCase()
            this.ser_t['modulo_id'] = this.getModulo(clave.substring(1))
            break;
          case 'tipo_pago':
            switch (clave.charAt(0)) {
              case 'l':
                this.tip['r'] = e[clave]
                break;
              case 'e':
                this.tip['w'] = e[clave]
                break;
              case 'a':
                this.tip['u'] = e[clave]
                break;
              case 'b':
                this.tip['d'] = e[clave]
                break;
              default:
                break;
            }
            this.tip['rol'] = this.getRol(this.personasRol.rol_id).toLowerCase()
            this.tip['modulo_id'] = this.getModulo(clave.substring(1))
            break;
          case 'servicio_venta':
            switch (clave.charAt(0)) {
              case 'l':
                this.ser_v['r'] = e[clave]
                break;
              case 'e':
                this.ser_v['w'] = e[clave]
                break;
              case 'a':
                this.ser_v['u'] = e[clave]
                break;
              case 'b':
                this.ser_v['d'] = e[clave]
                break;
              default:
                break;
            }
            this.ser_v['rol'] = this.getRol(this.personasRol.rol_id).toLowerCase()
            this.ser_v['modulo_id'] = this.getModulo(clave.substring(1))
            break;
          case 'detalle_venta':
            switch (clave.charAt(0)) {
              case 'l':
                this.det_v['r'] = e[clave]
                break;
              case 'e':
                this.det_v['w'] = e[clave]
                break;
              case 'a':
                this.det_v['u'] = e[clave]
                break;
              case 'b':
                this.det_v['d'] = e[clave]
                break;
              default:
                break;
            }
            this.det_v['rol'] = this.getRol(this.personasRol.rol_id).toLowerCase()
            this.det_v['modulo_id'] = this.getModulo(clave.substring(1))
            break;
          case 'rol_permisos':
            switch (clave.charAt(0)) {
              case 'l':
                this.r_per['r'] = e[clave]
                break;
              case 'e':
                this.r_per['w'] = e[clave]
                break;
              case 'a':
                this.r_per['u'] = e[clave]
                break;
              case 'b':
                this.r_per['d'] = e[clave]
                break;
              default:
                break;
            }
            this.r_per['rol'] = this.getRol(this.personasRol.rol_id).toLowerCase()
            this.r_per['modulo_id'] = this.getModulo(clave.substring(1))
            break;
          case 'persona_rol':
            switch (clave.charAt(0)) {
              case 'l':
                this.per_r['r'] = e[clave]
                break;
              case 'e':
                this.per_r['w'] = e[clave]
                break;
              case 'a':
                this.per_r['u'] = e[clave]
                break;
              case 'b':
                this.per_r['d'] = e[clave]
                break;
              default:
                break;
            }
            this.per_r['rol'] = this.getRol(this.personasRol.rol_id).toLowerCase()
            this.per_r['modulo_id'] = this.getModulo(clave.substring(1))
            break;
          case 'modulo':
            switch (clave.charAt(0)) {
              case 'l':
                this.mod['r'] = e[clave]
                break;
              case 'e':
                this.mod['w'] = e[clave]
                break;
              case 'a':
                this.mod['u'] = e[clave]
                break;
              case 'b':
                this.mod['d'] = e[clave]
                break;
              default:
                break;
            }
            this.mod['rol'] = this.getRol(this.personasRol.rol_id).toLowerCase()
            this.mod['modulo_id'] = this.getModulo(clave.substring(1))
            break;
          case 'producto_categoria':
              switch (clave.charAt(0)) {
                case 'l':
                  this.pro_cat['r'] = e[clave]
                  break;
                case 'e':
                  this.pro_cat['w'] = e[clave]
                  break;
                case 'a':
                  this.pro_cat['u'] = e[clave]
                  break;
                case 'b':
                  this.pro_cat['d'] = e[clave]
                  break;
                default:
                  break;
              }
              this.pro_cat['rol'] = this.getRol(this.personasRol.rol_id).toLowerCase()
              this.pro_cat['modulo_id'] = this.getModulo(clave.substring(1))
              break;
          default:
            break;
        }
      }
    })
    
    this.crearPermisos.push(this.cat)
    this.crearPermisos.push(this.con)
    this.crearPermisos.push(this.per)
    this.crearPermisos.push(this.pub)
    this.crearPermisos.push(this.perm)
    this.crearPermisos.push(this.rol)
    this.crearPermisos.push(this.pro)
    this.crearPermisos.push(this.ima)
    this.crearPermisos.push(this.ser_t)
    this.crearPermisos.push(this.tip)
    this.crearPermisos.push(this.ser_v)
    this.crearPermisos.push(this.det_v)
    this.crearPermisos.push(this.r_per)
    this.crearPermisos.push(this.per_r)
    this.crearPermisos.push(this.mod)
    this.crearPermisos.push(this.pro_cat)
  }

  updatePermisoRol() {
    let permisoRolNombre = { rol_id: ''}
    let numeroPermisoRol = 0
    let contador = 0
    this.personasRol.rol_id = this.formulario.get('rol_id')?.value;
    this.personasRol.permisos_todos= this.formulario.get('permisos_todos')?.value;
    permisoRolNombre = this.personasRoles.find((permisoRol: { rol_id: any}) => 
      (permisoRol.rol_id === this.personasRol.rol_id)
    );
      if (permisoRolNombre) {numeroPermisoRol = Number(permisoRolNombre.rol_id); }

    if (!numeroPermisoRol) {
      this.visibleNoActualizar = !this.visibleNoActualizar
      setTimeout(() => {
        this.todosPersonaRol();
        this.visibleNoActualizar = false;
      }, 3000);
    }else{
      this.crearPermisos = []
      this.cat = {}
      this.con = {}
      this.per = {}
      this.pub = {}
      this.perm = {}
      this.rol = {}
      this.pro = {}
      this.ima = {}
      this.ser_t = {}
      this.tip = {}
      this.ser_v = {}
      this.det_v = {}
      this.r_per = {}
      this.per_r = {}
      this.mod = {}
      this.pro_cat = {}
      this.modificarArreglo()
      
      this.crearPermisos.forEach( (e: any, index: any) => {
        let personaPermisoId = this.personasRoles.filter(e => e.rol_id === (this.getRol(this.crearPermisos[index].rol)))
        
        this.RolPermisosService.borrarDetalle(this.getRol(this.crearPermisos[index].rol), personaPermisoId[index].permisos_id).subscribe(
          (response: any) => {
            this.PermisosService.borrarPermiso(personaPermisoId[index].permisos_id).subscribe(
              (response: any) => {
              },
              (error) => {
                console.log(error);
              }
            );
          },
          (error) => {
            console.log(error);
          }
        );
      });
  
      this.crearPermisos.forEach( (e: any, index: any) => {
        
        this.PermisosService.createPermiso(e).subscribe(
          (response: any) => {
            this.permisoRolID.rol_id = this.personasRol.rol_id
            this.permisoRolID.permiso_id = response.id
            
            this.RolPermisosService.createDetalle(this.permisoRolID).subscribe(
              (response: any) => {
                contador++
                if (contador == (this.crearPermisos.length)) {
                  this.personasRol = {}
                  this.todosPersonaRol();
                  this.a = false
                }
              },
              (error) => {
                console.log(error);
              }
              );
            },
            (error) => {
              console.log(error);
            }
          );
      });
    }
    
  }
  
  deletePermisoRol() {
    let contador = 0;
    this.personasRol.rol_id = this.formulario.get('rol_id')?.value;//no puede ir vacio
    this.personasRol.permisos_todos = this.formulario.get('permisos_todos')?.value;
    this.crearPermisos = []
    this.cat = {}
    this.con = {}
    this.per = {}
    this.pub = {}
    this.perm = {}
    this.rol = {}
    this.pro = {}
    this.ima = {}
    this.ser_t = {}
    this.tip = {}
    this.ser_v = {}
    this.det_v = {}
    this.r_per = {}
    this.per_r = {}
    this.mod = {}
    this.pro_cat = {}
    this.modificarArreglo()
    
    this.crearPermisos.forEach( (e: any, index: any) => {
      let personaPermisoId = this.personasRoles.filter(e => e.rol_id === (this.getRol(this.crearPermisos[index].rol)))
      this.rol_id_del = this.crearPermisos[index].rol.charAt(0).toUpperCase() + this.crearPermisos[index].rol.slice(1)
      
      if (personaPermisoId[index]) {
        this.RolPermisosService.borrarDetalle(this.getRol(this.crearPermisos[index].rol), personaPermisoId[index].permisos_id).subscribe(
          (response: any) => {
            this.PermisosService.borrarPermiso(personaPermisoId[index].permisos_id).subscribe(
              (response: any) => {
                contador++
                if (contador == (this.crearPermisos.length)) {
                  this.personasRol = {}
                  this.todosPersonaRol();
                  this.b = false
                }
              },
              (error) => {
                console.log(error);
              }
            );
          },
          (error) => {
            console.log(error);
          }
        );
      }else{
        this.visibleNoPermisos = true
        setTimeout(() => {
          this.todosPersonaRol();
          this.rol_id_del = '';
        }, 3000);
      }
    });
  }

  updateFilter(event: any): void {
    
    const val = event.target.value.toLowerCase();
    // Filtra los datos de acuerdo con la cadenvala
    const filteredData = this.tempPersonasRol.filter((row) => {
      return (
        row.rol.toLowerCase().indexOf(val) !== -1 
        // this.getPermiso(row.permisos_id).toLowerCase().indexOf(val) !== -1 ||
        // row.cantidad.toString().indexOf(val) !== -1
      );
    });
    // Restablece el offset de la tabla para mostrar los resultados desde el principio
    this.personasRoles = filteredData;
    this.personasRoles = [...this.personasRoles];
  }
}