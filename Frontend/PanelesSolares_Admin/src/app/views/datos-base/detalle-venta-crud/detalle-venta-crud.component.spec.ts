import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleVentaCrudComponent } from './detalle-venta-crud.component';

describe('DetalleVentaCrudComponent', () => {
  let component: DetalleVentaCrudComponent;
  let fixture: ComponentFixture<DetalleVentaCrudComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetalleVentaCrudComponent]
    });
    fixture = TestBed.createComponent(DetalleVentaCrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
