import {Component} from '@angular/core';
import {VerAgendamentoService} from './ver-agendamento.service';
import {first} from 'rxjs';
import {GetListProcedimentoInput} from "../../../tokens/models/get-list-procedimento-input";
import {AuthenticationService} from "../../../tokens";
import {ProcedimentoOutput} from "../../../tokens/models/procedimento-output";
import {Router} from "@angular/router";
import {resultadoOutput} from "../../../tokens/models/resultadoOutput";
import {AnexosService} from "../../../tokens/services/anexos.service";
import {StatusProcedimento} from "../../../tokens/enums/status-procedimento";

@Component({
  selector: 'app-ver-agendamento-paciente',
  templateUrl: './ver-agendamento-paciente.component.html',
  styleUrl: './ver-agendamento-paciente.component.scss',
})
export class VerAgendamentoPacienteComponent {
  constructor(private verAgendamentoService: VerAgendamentoService, private auth: AuthenticationService, private route: Router, private anexoService: AnexosService) {
  }

  public statusProcedimento = StatusProcedimento;
  public procedimento: ProcedimentoOutput[];
  public cancelando = false;
  public carregando :boolean = true;
  public resultadoFinalizado = true;
  public resultado: resultadoOutput;

  ngOnInit() {

    this.getProcedimento();


  }

  getProcedimento() {
    const filter = new GetListProcedimentoInput();
    filter.pacienteId = this.auth.user?.id;
    this.verAgendamentoService.getAgendamentos(filter).subscribe(res => {
      this.procedimento = res.items;
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

  public cancelar(procedimento: ProcedimentoOutput): void {
    procedimento.status = StatusProcedimento.Cancelado;
    this.cancelando = true
    this.verAgendamentoService
      .update(procedimento.id, procedimento)
      .pipe(first())
      .subscribe({
        next: () => {
          this.cancelando = false
          this.getProcedimento();
        },
      });
  }
}
