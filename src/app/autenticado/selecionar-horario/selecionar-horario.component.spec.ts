import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelecionarHorarioComponent } from './selecionar-horario.component';

describe('SelecionarHorarioComponent', () => {
  let component: SelecionarHorarioComponent;
  let fixture: ComponentFixture<SelecionarHorarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelecionarHorarioComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SelecionarHorarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
