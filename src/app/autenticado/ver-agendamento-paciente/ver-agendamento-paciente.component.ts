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
import {Router} from "@angular/router";
import {resultadoOutput} from "../../../tokens/models/resultadoOutput";
import {AnexosService} from "../../../tokens/services/anexos.service";

@Component({
  selector: 'app-ver-agendamento-paciente',
  templateUrl: './ver-agendamento-paciente.component.html',
  styleUrl: './ver-agendamento-paciente.component.scss',
})
export class VerAgendamentoPacienteComponent {
  constructor(private verAgendamentoService: VerAgendamentoService, private auth: AuthenticationService, private route: Router, private anexoService: AnexosService) {
  }

  public procedimento: ProcedimentoOutput[];
  public cancelando : boolean;
  public carregando :boolean = true;
  public resultadoFinalizado = true;
  public resultado: resultadoOutput;

  ngOnInit() {

    this.getProcedimento();
    console.log(this.procedimento);


  }

  getProcedimento() {
    const filter = new GetListProcedimentoInput();
    filter.pacienteId = this.auth.user?.id;
    this.verAgendamentoService.getAgendamentos(filter).subscribe(res => {
      this.procedimento = res.items;
      console.log(this.procedimento);
      this.cancelando = false
      this.carregando = false
    })
  }

  getResultado(id: string) {
    this.verAgendamentoService.getResultado(id).subscribe(res => {
      this.resultado = res;
      this.verAgendamentoService.getAnexo(this.resultado.anexoId).subscribe(response => {
        this.anexoService.download(response, true).subscribe()
      })
    })

  }




  navegar(id?: string) {
    if (id) {
      this.route.navigate(['auth/meus-procedimentos/' + id])

    }
  }

  public cancelar(id: string): void {
    this.cancelando = true
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
