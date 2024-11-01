import { TestBed } from '@angular/core/testing';

import { OlvidoContrasenaService } from './olvido-contrasena.service';

describe('OlvidoContrasenaService', () => {
  let service: OlvidoContrasenaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OlvidoContrasenaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
