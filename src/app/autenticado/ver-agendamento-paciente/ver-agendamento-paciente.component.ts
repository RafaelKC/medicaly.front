import {Component} from '@angular/core';
import {ProcedimentoInput} from '../../../tokens/models/procedimento';
import {VerAgendamentoPacienteModule} from './ver-agendamento-paciente.module';
import {VerAgendamentoService} from './ver-agendamento.service';
import {GetProcedimentoOutput} from '../../../tokens/models/get-procedimento-output';
import {ProfissionalInput} from '../../../tokens/models/profissional-input';
import {first} from 'rxjs';
import {GetListProcedimentoInput} from "../../../tokens/models/get-list-procedimento-input";
import {AuthenticationService} from "../../../tokens";
import {error} from "@angular/compiler-cli/src/transformers/util";
import {ProcedimentoOutput} from "../../../tokens/models/procedimento-output";

@Component({
  selector: 'app-ver-agendamento-paciente',
  templateUrl: './ver-agendamento-paciente.component.html',
  styleUrl: './ver-agendamento-paciente.component.scss',
})
export class VerAgendamentoPacienteComponent {
  constructor(private verAgendamentoService: VerAgendamentoService, private auth: AuthenticationService,) {
  }

  public procedimento: ProcedimentoOutput[];
  public medico: ProfissionalInput;

  ngOnInit() {
    if (this.auth.user?.id) {
      this.getProcedimento();
      console.log(this.procedimento);
    }

  }

  getProcedimento() {
    const filter = new GetListProcedimentoInput();
    filter.pacienteId = this.auth.user?.id;
    this.verAgendamentoService.getAgendamentos(filter).subscribe(res => {
      this.procedimento = res.items;
      console.log(this.procedimento);
    })
  }

  public cancelar(id: string): void {
    this.verAgendamentoService
      .cancelar(id)
      .pipe(first())
      .subscribe({
        next: (result) => {
          this.getProcedimento();
        },
      });
  }
}
