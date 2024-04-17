import {Component, OnDestroy, OnInit} from '@angular/core';
import {
  CPF_MASK,
  DiasSemana,
  EnderecoInput,
  GenericValidators,
  Genero,
  SelectOption,
  stringIsNullOrEmptyOrWhitespace,
  SubscriptionsManagerUtil,
  TELEFONE_MASK,
  TipoProfissional
} from "../../../tokens";
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators
} from "@angular/forms";
import {v4 as uuidv4} from "uuid";
import {ProfissionalInput} from "../../../tokens/models/profissional-input";
import {CreateProfissionalInput} from "../../../tokens/models/create-profissional-input";
import {CreateProfissionalService} from "./create-profissional.service";
import {first} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";
import {MessageService} from "primeng/api";
import {ProfissionalOutput} from "../../../tokens/models/profissional-output";

class ProfissionalForm {
  public nome: FormControl<string|null>;
  public id: FormControl<string|null>;
  public sobrenome: FormControl<string|null>;
  public cpf: FormControl<string|null>;
  public email: FormControl<string|null>;
  public telefone: FormControl<string|null>;
  public dataNascimento: FormControl<Date|null>;
  public genero: FormControl<Genero|null>;
  public credencialDeSaude: FormControl<string|null>;
  public atuacoes: FormControl<Array<string>|null>;
  public especialidades: FormControl<Array<string>|null>;
  public tipo: FormControl<TipoProfissional|null>;
  public fimExpediente: FormControl<number|null>;
  public inicioExpediente: FormControl<number|null>;
  public diasAtendidos: FormControl<DiasSemana[]|null>;
  public senha: FormControl<string|null>;
}

@Component({
  selector: 'app-cadastro-profissional',
  templateUrl: './cadastro-profissional.component.html',
  styleUrl: './cadastro-profissional.component.scss'
})
export class CadastroProfissionalComponent implements OnInit, OnDestroy {
  public etapaProfissionalConcluido = false;
  public carregado = false;

  public cpfMask = CPF_MASK;
  public telefoneMask = TELEFONE_MASK;

  public profissionalForm: FormGroup<ProfissionalForm>;
  public minDate: Date = new Date('01-01-1940');
  public maxDate = new Date();
  public generos = Genero;
  public tipoProfissional = TipoProfissional;

  public especialidadeOptions = [
    { key: 'Oftalmologia', value: 'Oftalmologia' },
    { key: 'Pediatria', value: 'Pediatria' },
  ] as SelectOption<string>[]

  public diasSemanaOptions = [
    { key: 'Domingo', value: DiasSemana.Domingo },
    { key: 'Segunda-feira', value: DiasSemana.Segunda },
    { key: 'Terça-feira', value: DiasSemana.Terca },
    { key: 'Quarta-feira', value: DiasSemana.Quarta },
    { key: 'Quinta-feira', value: DiasSemana.Quinta },
    { key: 'Sexta', value: DiasSemana.Sexta },
    { key: 'Sábado', value: DiasSemana.Sabado },
  ] as SelectOption<DiasSemana>[]

  private subs = new SubscriptionsManagerUtil();

  private profissional: ProfissionalOutput;
  public editando = false;

  constructor(
    private formBuilder: FormBuilder,
    private service: CreateProfissionalService,
    private messageService: MessageService,
    private router: Router,
    private route: ActivatedRoute
  ) {
  }

  public ngOnInit(): void {
    this.route.parent?.params.pipe(first()).subscribe(params => {
      const id = params['id']; // (+) converts string 'id' to a number
      if (stringIsNullOrEmptyOrWhitespace(id)) {
        this.setNovoProfissional();
      } else {
        this.setEditandoProfissional(id);
      }
    });
    }

  public ngOnDestroy(): void {
    this.subs.clear();
  }

  public get podeProsseguir(): boolean {
    return this.profissionalForm.valid;
  }


  public setEndereco(endereco: EnderecoInput): void {
    const profissional = this.profissionalForm.value;
    const createInput = new CreateProfissionalInput();
    createInput.password = this.profissionalForm.value.senha as string;
    createInput.endereco = endereco;
    createInput.profissional = profissional as ProfissionalInput;

    this.service.create(createInput).pipe(first()).subscribe({
      next: () => {
        this.messageService.add({ summary: 'Médico criado com sucesso', severity: 'success' });
        this.router.navigate(['/auth/dashboard-adm'])
      }
    });
  }

  public prosseguir(): void {
    if(!this.editando) {
      if (!this.podeProsseguir) return;
      this.etapaProfissionalConcluido = true;
    } else {
      const profissional = {
        ...this.profissionalForm.value
      } as ProfissionalInput;

      this.service.update(this.profissional.id, profissional).pipe(first()).subscribe({
        next: () => {
          this.messageService.add({ summary: 'Profissional alterado com sucesso', severity: 'success' });
          this.router.navigate(['/auth/dashboard-adm'])
        }
      });
    }
  }

  private createForm(): void {
    this.profissionalForm = this.formBuilder.group<ProfissionalForm>({
      id: new FormControl(this.profissional.id, { validators: [Validators.required] }),
      nome: new FormControl(this.profissional.nome, { validators: [Validators.required] }),
      sobrenome: new FormControl(this.profissional.sobrenome, { validators: [Validators.required] }),
      email: new FormControl(this.profissional.email, { validators: [Validators.required, Validators.email] }),
      telefone: new FormControl(this.profissional.telefone, { validators: [
          Validators.minLength(10), Validators.maxLength(11), Validators.required ] }),
      cpf: new FormControl(this.profissional.cpf, { validators: [
          Validators.minLength(11), Validators.maxLength(11),
          Validators.required, GenericValidators.isValidCpf() ] }),
      dataNascimento: new FormControl(this.profissional.dataNascimento, { validators: [Validators.required], nonNullable: true }),
      genero: new FormControl(this.profissional.genero, { validators: [Validators.required] }),
      atuacoes: new FormControl(this.profissional.atuacoes, { validators: [Validators.required] }),
      especialidades: new FormControl(this.profissional.especialidades, { validators: [Validators.required] }),
      tipo: new FormControl(this.profissional.tipo, { validators: [Validators.required] }),
      fimExpediente: new FormControl(this.profissional.fimExpediente, { validators: [Validators.required, this.validarFimExpediente] }),
      inicioExpediente: new FormControl(this.profissional.inicioExpediente, { validators: [Validators.required] }),
      credencialDeSaude: new FormControl(this.profissional.credencialDeSaude, { validators: [Validators.required] }),
      diasAtendidos: new FormControl(this.profissional.diasAtendidos, {validators: [Validators.required]}),
      senha: new FormControl('', { validators: this.editando ? [] : [Validators.required] }),
    });
    const inicioSub = this.profissionalForm.controls.inicioExpediente
      .valueChanges.subscribe({
        next: value => {
          this.profissionalForm.controls.fimExpediente.updateValueAndValidity();
        }
      });

    this.subs.add(inicioSub);

    this.carregado = true;
  }

  public validarFimExpediente: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    const inicioExpediente = this.profissionalForm?.get('inicioExpediente')?.value;
    const fimExpediente = control.value;
    if (!inicioExpediente || !fimExpediente) {return null}
    if (inicioExpediente >= fimExpediente) return {rangeError:true} as ValidationErrors;
    return null;
  }

  private setNovoProfissional(): void {
    this.profissional = new ProfissionalOutput();
    this.profissional.id = uuidv4();
    this.profissional.diasAtendidos = [];
    this.profissional.atuacoes = [];
    this.profissional.especialidades = [];
    this.profissional.tipo = TipoProfissional.Medico;
    this.profissional.genero = Genero.Masculino;
    this.createForm();
  }

  private setEditandoProfissional(id: string): void {
    this.service.getById(id).pipe(first()).subscribe({
      next: result => {
        this.profissional = result;
        this.editando = true;
        this.createForm();
      },
      error: () => this.setNovoProfissional()
    })
  }
}
