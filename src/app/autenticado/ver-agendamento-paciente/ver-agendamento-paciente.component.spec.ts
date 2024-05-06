import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerAgendamentoPacienteComponent } from './ver-agendamento-paciente.component';

describe('VerAgendamentoPacienteComponent', () => {
  let component: VerAgendamentoPacienteComponent;
  let fixture: ComponentFixture<VerAgendamentoPacienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VerAgendamentoPacienteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VerAgendamentoPacienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
