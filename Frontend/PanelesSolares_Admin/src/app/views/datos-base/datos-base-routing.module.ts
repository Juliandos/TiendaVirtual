import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoriaCRUDComponent } from './categoria-crud/categoria-crud.component';
import { FormsModule } from '@angular/forms';
import { ContactoCRUDComponent } from './contacto-crud/contacto-crud.component';
import { ProductosCrudComponent } from './productos-crud/productos-crud.component';
import { DetalleVentaCrudComponent } from './detalle-venta-crud/detalle-venta-crud.component';
import { ServicioVentaCrudComponent } from './servicio-venta-crud/servicio-venta-crud.component';
import { TipoPagoCrudComponent } from './tipo-pago-crud/tipo-pago-crud.component';
import { ServicioTipoComponent } from './servicio-tipo/servicio-tipo.component';
import { ImagenCrudComponent } from './imagen-crud/imagen-crud.component';
import { PublicacionCrudComponent } from './publicacion-crud/publicacion-crud.component';
import { ModuloCrudComponent } from './modulo-crud/modulo-crud.component';
import { ProductoCategoriaCrudComponent } from './producto-categoria-crud/producto-categoria-crud.component';
import { RolCrudComponent } from './rol-crud/rol-crud.component';
import { PermisosCrudComponent } from './permisos-crud/permisos-crud.component';
import { RolPermisosCrudComponent } from './rol-permisos-crud/rol-permisos-crud.component';
import { PersonaCrudComponent } from './persona-crud/persona-crud.component';
import { PersonaRolCrudComponent } from './persona-rol-crud/persona-rol-crud.component';
import { Page404Component } from '../pages/page404/page404.component';

import { permisosGuard } from '../../guards/permisos.guard'

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Categorías'
    },
    children: [
      {
        data: {
          title: 'Categorías',
          modulo: 'categoria'
        },
        path: 'categorias-crud',
        canActivate: [permisosGuard],
        component: CategoriaCRUDComponent,
      },
      {
        data: {
          title: 'Contacto',
          modulo: 'contacto'
        },
        path: 'contacto-crud',
        canActivate: [permisosGuard],
        component: ContactoCRUDComponent,
      },
      {
        path: 'productos-crud',
        canActivate: [permisosGuard],
        component: ProductosCrudComponent,
        data: {
          title: 'Productos',
          modulo: 'producto'
        }
      },
      {
        path: 'detalle-venta-crud',
        canActivate: [permisosGuard],
        component: DetalleVentaCrudComponent,
        data: {
          title: 'Detalle Venta',
          modulo: 'detalle_venta'
        }
      },
      {
        path: 'servicio-venta-crud',
        canActivate: [permisosGuard],
        component: ServicioVentaCrudComponent,
        data: {
          title: 'Servicio Venta',
          modulo: 'servicio_venta'
        }
      },
      {
        path: 'tipo-pago-crud',
        canActivate: [permisosGuard],
        component: TipoPagoCrudComponent,
        data: {
          title: 'Tipo Pago',
          modulo: 'tipo_pago'
        }
      },
      {
        path: 'servicio-tipo',
        canActivate: [permisosGuard],
        component: ServicioTipoComponent,
        data: {
          title: 'Servicio Tipo',
          modulo: 'servicio_tipo'
        }
      },
      {
        path: 'imagen-crud',
        canActivate: [permisosGuard],
        component: ImagenCrudComponent,
        data: {
          title: 'Imagen',
          modulo: 'imagen'
        }
      },
      {
        path: 'publicacion-crud',
        canActivate: [permisosGuard],
        component: PublicacionCrudComponent,
        data: {
          title: 'Publicacion',
          modulo: 'publicacion'
        }
      },
      {
        path: 'modulo-crud',
        canActivate: [permisosGuard],
        component: ModuloCrudComponent,
        data: {
          title: 'Módulo',
          modulo: 'modulo'
        }
      },
      {
        path: 'producto-categoria-crud',
        canActivate: [permisosGuard],
        component: ProductoCategoriaCrudComponent,
        data: {
          title: 'Producto Categoria',
          modulo: 'producto_categoria'
        }
      },
      {
        path: 'rol-crud',
        canActivate: [permisosGuard],
        component: RolCrudComponent,
        data: {
          title: 'Rol',
          modulo: 'rol'
        }
      },
      {
        path: 'permisos-crud',
        canActivate: [permisosGuard],
        component: PermisosCrudComponent,
        data: {
          title: 'Permisos',
          modulo: 'permisos'
        }
      },
      {
        path: 'rol-permisos-crud',
        canActivate: [permisosGuard],
        component: RolPermisosCrudComponent,
        data: {
          title: 'Rol Permisos',
          modulo: 'rol_permisos'
        }
      },
      {
        path: 'persona-crud',
        canActivate: [permisosGuard],
        component: PersonaCrudComponent,
        data: {
          title: 'Personas',
          modulo: 'persona'
        }
      },
      {
        path: 'persona-rol-crud',
        canActivate: [permisosGuard],
        component: PersonaRolCrudComponent,
        data: {
          title: 'Persona Rol',
          modulo: 'persona_rol'
        }
      },
      {
        path: '**',
        canActivate: [permisosGuard],
        component: Page404Component,
        data: {
          title: '404',
          modulo: '**'
        }
      }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    FormsModule
  ],
  exports: [RouterModule]
})
export class DatosBaseRoutingModule { }
