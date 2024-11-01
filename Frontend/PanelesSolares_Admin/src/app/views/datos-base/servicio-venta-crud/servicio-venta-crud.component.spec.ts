import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicioVentaCrudComponent } from './servicio-venta-crud.component';

describe('ServicioVentaCrudComponent', () => {
  let component: ServicioVentaCrudComponent;
  let fixture: ComponentFixture<ServicioVentaCrudComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ServicioVentaCrudComponent]
    });
    fixture = TestBed.createComponent(ServicioVentaCrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
