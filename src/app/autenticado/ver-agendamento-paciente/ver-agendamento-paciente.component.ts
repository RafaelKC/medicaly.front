import { Component } from '@angular/core';
import { ProcedimentoInput } from '../../../tokens/models/procedimento';
import { VerAgendamentoPacienteModule } from './ver-agendamento-paciente.module';

@Component({
  selector: 'app-ver-agendamento-paciente',
  templateUrl: './ver-agendamento-paciente.component.html',
  styleUrl: './ver-agendamento-paciente.component.scss'
})
export class VerAgendamentoPacienteComponent {
  public procedimento: ProcedimentoInput[]
}
