import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RolPermisosCrudComponent } from './rol-permisos-crud.component';

describe('RolPermisosCrudComponent', () => {
  let component: RolPermisosCrudComponent;
  let fixture: ComponentFixture<RolPermisosCrudComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RolPermisosCrudComponent]
    });
    fixture = TestBed.createComponent(RolPermisosCrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
