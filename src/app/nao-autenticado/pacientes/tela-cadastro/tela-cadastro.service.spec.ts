import { TestBed } from '@angular/core/testing';

import { TelaCadastroService } from './tela-cadastro.service';

describe('TelaCadastroService', () => {
  let service: TelaCadastroService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TelaCadastroService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
