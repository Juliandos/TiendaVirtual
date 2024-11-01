import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { RolPermisosService } from '../services/rol-permisos.service';

import {Permiso} from '../models/Permiso.enum';

@Directive({
  selector: '[appPermissions]'
})
export class PermissionsDirective {

  private modulo: string | null = null;
  private email: string | null = null;
  private permiso: Permiso | null = null;

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private rolPermisosService: RolPermisosService 
  ) {}

  @Input() set appPermissions(params: {modulo: string, permiso: Permiso}) {
    this.email = localStorage.getItem('persona_email');
    this.modulo = params.modulo;
    this.permiso = params.permiso;
  }

  ngOnInit() {
    this.checkPermissions();
  }

  private checkPermissions() {
    if (this.email && this.modulo) {
      this.rolPermisosService.obtenerPermisos(this.modulo, this.email).subscribe(
        (response: any) => {
          switch (this.permiso) {
            case Permiso.Escribir:
              if (response.w) {
                this.viewContainer.createEmbeddedView(this.templateRef);
              } else {
                this.viewContainer.clear();
              }
              break;
            case Permiso.Actualizar:
              if (response.u) {
                this.viewContainer.createEmbeddedView(this.templateRef);
              } else {
                this.viewContainer.clear();
              }
              break;
            case Permiso.Borrar:
              if (response.d) {
                this.viewContainer.createEmbeddedView(this.templateRef);
              } else {
                this.viewContainer.clear();
              }
              break;
            case Permiso.Leer:
            if (response.r) {
              this.viewContainer.createEmbeddedView(this.templateRef);
            } else {
              this.viewContainer.clear();
            }
            break;
            default:
              break;
          }
        },
        (error) => {
          console.error('Error checking permissions:', error);
          this.viewContainer.clear();
        }
      );
    } else {
      this.viewContainer.clear();
    }
  }
}
