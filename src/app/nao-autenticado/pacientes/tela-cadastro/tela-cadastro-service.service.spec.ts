import { TestBed } from '@angular/core/testing';

import { TelaCadastroServiceService } from './tela-cadastro-service.service';

describe('TelaCadastroServiceService', () => {
  let service: TelaCadastroServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TelaCadastroServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
