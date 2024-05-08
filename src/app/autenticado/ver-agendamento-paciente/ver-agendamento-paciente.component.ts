import { Component } from '@angular/core';
import { ProcedimentoInput } from '../../../tokens/models/procedimento';
import { VerAgendamentoPacienteModule } from './ver-agendamento-paciente.module';
import { VerAgendamentoService } from './ver-agendamento.service';
import { GetProcedimentoOutput } from '../../../tokens/models/get-procedimento-output';
import { ProfissionalInput } from '../../../tokens/models/profissional-input';
import { first } from 'rxjs';

@Component({
  selector: 'app-ver-agendamento-paciente',
  templateUrl: './ver-agendamento-paciente.component.html',
  styleUrl: './ver-agendamento-paciente.component.scss',
})
export class VerAgendamentoPacienteComponent {
  constructor(private verAgendamentoService: VerAgendamentoService) {}
  public procedimento: ProcedimentoInput[];
  public medico: ProfissionalInput;
  ngOnInit() {
    this.getAgendamentos();
    console.log(this.procedimento);
  }

  public getAgendamentos() {
    this.verAgendamentoService.getAgendamentos(10).subscribe((response) => {
      this.procedimento = response.items;
    });
  }

  public cancelar(id: string): void {
    this.verAgendamentoService
      .cancelar(id)
      .pipe(first())
      .subscribe({
        next: (result) => {
          this.getAgendamentos();
        },
      });
  }
}
