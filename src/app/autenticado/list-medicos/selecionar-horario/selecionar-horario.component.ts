import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {TipoProcedimento} from "../../../../tokens/enums/tipo-procedimento";
import { ProfissionalInput } from '../../../../tokens/models/profissional-input';

@Component({
  selector: 'app-selecionar-horario',
  templateUrl: './selecionar-horario.component.html',
  styleUrl: './selecionar-horario.component.scss'
})
export class SelecionarHorarioComponent implements OnInit{
  selected: Date | null;
  public agendamentoForm: FormGroup<AgendamentoForm>;
  public carregado = false;
  medico: ProfissionalInput;

  constructor(private formBuilder: FormBuilder,) {


  }

  private createForm(): void {
    this.agendamentoForm = this.formBuilder.group<AgendamentoForm>({
      horarioProcedimento: new FormControl(0, [Validators.required]),
      tipoProcedimento: new FormControl(0, [Validators.required]),
      dataProcedimento: new FormControl(null, [Validators.required]),
    })
    this.carregado = true;
  }

  public ngOnInit():void{
    this.createForm()
  }


  public updateFormDate(event: Date):void {
    this.agendamentoForm.get('dataProcedimento')?.setValue(event);
  }

  public converterMilissegundosParaHorasMinutos(milissegundos: number|null|undefined): string {
    if(milissegundos==null || isNaN(milissegundos)){return ''}
    const segundosTotal = Math.floor(milissegundos / 1000);
    const horas = Math.floor(segundosTotal / 3600);
    const minutos = Math.floor((segundosTotal % 3600) / 60);

    const horasStr = horas < 10 ? '0' + horas : String(horas);
    const minutosStr = minutos < 10 ? '0' + minutos : String(minutos);

    return `${horasStr}:${minutosStr}`;
  }

  constructor(
    private selecionarService: SelecionarHorarioService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.parent?.params.pipe(first()).subscribe(params => {
      const id = params['id'];
      if (stringIsNullOrEmptyOrWhitespace(id)) {
        this.router.navigate(['/auth/list-medicos']);
      } else {
        this.id = id;
        this.selecionarService.getProfissional(id).subscribe((medico: ProfissionalInput) => {
          this.medico = medico;
        });
      }
    });
  }
}

class AgendamentoForm {
  public dataProcedimento: FormControl<Date|null>;
  public horarioProcedimento: FormControl<number|null>;
  public tipoProcedimento: FormControl<TipoProcedimento|null>;

}




