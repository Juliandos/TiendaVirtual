import { TestBed } from '@angular/core/testing';

import { ServicioTipoService } from './servicio-tipo.service';

describe('ServicioTipoService', () => {
  let service: ServicioTipoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServicioTipoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
