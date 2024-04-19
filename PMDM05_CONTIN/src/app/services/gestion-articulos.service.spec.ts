import { TestBed } from '@angular/core/testing';

import { GestionArticuloService } from './gestion-articulos.service';

describe('GestionPersonasService', () => {
  let service: GestionArticuloService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GestionArticuloService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
