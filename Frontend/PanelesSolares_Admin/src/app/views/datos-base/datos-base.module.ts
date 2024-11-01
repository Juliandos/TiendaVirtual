import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CommonModule } from '@angular/common';

import { DatosBaseRoutingModule } from './datos-base-routing.module';
import { CategoriaCRUDComponent } from './categoria-crud/categoria-crud.component';

import { NgxDatatableModule } from '@swimlane/ngx-datatable';
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
import { AlertModule, ModalModule, ButtonModule, ToastModule } from '@coreui/angular';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { PermissionsDirective } from '../../directives/permissions.directive';

@NgModule({
  declarations: [
    CategoriaCRUDComponent,
    ContactoCRUDComponent,
    ProductosCrudComponent,
    DetalleVentaCrudComponent,
    ServicioVentaCrudComponent,
    TipoPagoCrudComponent,
    ServicioTipoComponent,
    ImagenCrudComponent,
    PublicacionCrudComponent,
    ModuloCrudComponent,
    ProductoCategoriaCrudComponent,
    RolCrudComponent,
    PermisosCrudComponent,
    RolPermisosCrudComponent,
    PersonaCrudComponent,
    PersonaRolCrudComponent,
    PermissionsDirective
    // Page404Component
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  imports: [
    CommonModule,
    DatosBaseRoutingModule,
    NgxDatatableModule,
    FormsModule,
    ReactiveFormsModule,
    AlertModule,
    ModalModule,
    ButtonModule,
    NgbModule,
    ToastModule
  ],
})
export class DatosBaseModule {}
