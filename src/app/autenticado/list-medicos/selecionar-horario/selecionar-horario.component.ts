import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {TipoProcedimento} from "../../../../tokens/enums/tipo-procedimento";
import {ProfissionalInput} from '../../../../tokens/models/profissional-input';
import {AuthenticationService, DiasSemana, stringIsNullOrEmptyOrWhitespace} from "../../../../tokens";
import {SelecionarHorarioService} from "./selecionar-horario.service";
import {ActivatedRoute, Router} from "@angular/router";
import {first} from "rxjs";
import {ProcedimentoInput} from "../../../../tokens/models/procedimento";
import {StatusProcedimento} from "../../../../tokens/enums/status-procedimento";
import {MatDialog} from "@angular/material/dialog";
import {ConflitoMessageComponent} from "./conflito-message/conflito-message.component";
import {AgendadoMessageComponent} from "./agendado-message/agendado-message.component";

@Component({
  selector: 'app-selecionar-horario',
  templateUrl: './selecionar-horario.component.html',
  styleUrl: './selecionar-horario.component.scss'
})
export class SelecionarHorarioComponent implements OnInit {
  selected: Date | null;
  public agendamentoForm: FormGroup<AgendamentoForm>;
  public carregado = false;
  medico: ProfissionalInput;


  private createForm(): void {
    this.agendamentoForm = this.formBuilder.group<AgendamentoForm>({
      horarioProcedimento: new FormControl(0, [Validators.required]),
      tipoProcedimento: new FormControl(0, [Validators.required]),
      dataProcedimento: new FormControl(null, [Validators.required]),
    })
    this.carregado = true;
  }


  public updateFormDate(event: Date): void {
    this.agendamentoForm.get('dataProcedimento')?.setValue(event);
  }

  public converterMilissegundosParaHorasMinutos(milissegundos: number | null | undefined): string {
    if (milissegundos == null || isNaN(milissegundos)) {
      return ''
    }
    const segundosTotal = Math.floor(milissegundos / 1000);
    const horas = Math.floor(segundosTotal / 3600);
    const minutos = Math.floor((segundosTotal % 3600) / 60);

    const horasStr = horas < 10 ? '0' + horas : String(horas);
    const minutosStr = minutos < 10 ? '0' + minutos : String(minutos);

    return `${horasStr}:${minutosStr}`;
  }

  public salvar() {

    console.log(this.authService.user)
    const data = this.agendamentoForm.value.dataProcedimento;
    data?.setHours(0,0,0,0,);
    data?.setMilliseconds(Number(this.agendamentoForm.value.horarioProcedimento))
    const procedimento = {
      status: StatusProcedimento.Ativo,
      tipoProcedimento: TipoProcedimento.Cirurgia,
      idProfissional: this.medico.id,
      idPaciente: this.authService.user?.id,
      codigoTuss: '123456',
      idUnidadeAtendimento: this.medico.unidadeId,
      data: data
    } as ProcedimentoInput

    this.selecionarService.createProcedimento(procedimento).subscribe({
      next: () => {
        this.dialogService.open(AgendadoMessageComponent, { data: {
            data: data,
            profissional: this.medico
          } })
          .afterClosed().pipe(first())
          .subscribe({
            next: () => {
              this.router.navigate(['/home'])
            }
          })
      },
      error: () => this.dialogService.open(ConflitoMessageComponent, { data: {
          data: data
        }})
    })

  }

  public get podeSalvar(): boolean {
    return this.agendamentoForm.valid
  }


  constructor(
    private dialogService: MatDialog,
    private selecionarService: SelecionarHorarioService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private authService: AuthenticationService
  ) {
  }

  ngOnInit() {
    this.route.parent?.params.pipe(first()).subscribe(params => {
      const id = params['id'];
      if (stringIsNullOrEmptyOrWhitespace(id)) {
        this.router.navigate(['/auth/list-medicos']);
      } else {
        this.selecionarService.getProfissional(id).subscribe((medico: ProfissionalInput) => {
          this.medico = medico;
          this.createForm()

        });
      }
    });
  }

  public getDiaDescricao(d: DiasSemana) {
    return DiasSemana[d];
  }
}

class AgendamentoForm {
  public dataProcedimento: FormControl<Date | null>;
  public horarioProcedimento: FormControl<number | null>;
  public tipoProcedimento: FormControl<TipoProcedimento | null>;

}




