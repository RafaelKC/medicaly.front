import { TestBed } from '@angular/core/testing';

import { SelecionarHorarioService } from './selecionar-horario.service';

describe('SelecionarHorarioService', () => {
  let service: SelecionarHorarioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SelecionarHorarioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
