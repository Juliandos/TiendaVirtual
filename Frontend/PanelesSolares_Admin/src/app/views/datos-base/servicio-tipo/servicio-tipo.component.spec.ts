import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicioTipoComponent } from './servicio-tipo.component';

describe('ServicioTipoComponent', () => {
  let component: ServicioTipoComponent;
  let fixture: ComponentFixture<ServicioTipoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ServicioTipoComponent]
    });
    fixture = TestBed.createComponent(ServicioTipoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
