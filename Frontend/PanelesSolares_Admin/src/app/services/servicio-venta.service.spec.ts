import { TestBed } from '@angular/core/testing';

import { ServicioVentaService } from './servicio-venta.service';

describe('ServicioVentaService', () => {
  let service: ServicioVentaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServicioVentaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
