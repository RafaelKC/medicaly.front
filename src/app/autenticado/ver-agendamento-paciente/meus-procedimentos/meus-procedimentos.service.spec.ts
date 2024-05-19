import { TestBed } from '@angular/core/testing';

import { MeusProcedimentosService } from './meus-procedimentos.service';

describe('MeusProcedimentosService', () => {
  let service: MeusProcedimentosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MeusProcedimentosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
