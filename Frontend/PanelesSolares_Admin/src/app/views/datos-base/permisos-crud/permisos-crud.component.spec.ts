import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PermisosCrudComponent } from './permisos-crud.component';

describe('PermisosCrudComponent', () => {
  let component: PermisosCrudComponent;
  let fixture: ComponentFixture<PermisosCrudComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PermisosCrudComponent]
    });
    fixture = TestBed.createComponent(PermisosCrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
