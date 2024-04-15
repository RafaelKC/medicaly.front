import {Component, OnInit} from '@angular/core';
import {
  CPF_MASK,
  DiasSemana,
  EnderecoInput,
  GenericValidators,
  Genero,
  SelectOption, SubscriptionsManagerUtil,
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
import {Router} from "@angular/router";
import {MessageService} from "primeng/api";

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
export class CadastroProfissionalComponent implements OnInit {
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

  constructor(
    private formBuilder: FormBuilder,
    private service: CreateProfissionalService,
    private messageService: MessageService,
    private router: Router) {
  }

  public ngOnInit(): void {
    this.createForm();
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
        this.messageService.add({ summary: 'Médico criado crom sucesso', severity: 'success' });
        this.router.navigate(['/'])
      }
    });
  }

  public prosseguir(): void {
    if (!this.podeProsseguir) return;
    this.etapaProfissionalConcluido = true;
  }

  private createForm(): void {
    this.profissionalForm = this.formBuilder.group<ProfissionalForm>({
      id: new FormControl(uuidv4(), { validators: [Validators.required] }),
      nome: new FormControl('', { validators: [Validators.required] }),
      sobrenome: new FormControl('', { validators: [Validators.required] }),
      email: new FormControl('', { validators: [Validators.required, Validators.email] }),
      telefone: new FormControl('', { validators: [
          Validators.minLength(10), Validators.maxLength(11), Validators.required ] }),
      cpf: new FormControl('', { validators: [
          Validators.minLength(11), Validators.maxLength(11),
          Validators.required, GenericValidators.isValidCpf() ] }),
      dataNascimento: new FormControl(null, { validators: [Validators.required], nonNullable: true }),
      genero: new FormControl(Genero.Masculino, { validators: [Validators.required] }),
      atuacoes: new FormControl([], { validators: [Validators.required] }),
      especialidades: new FormControl([], { validators: [Validators.required] }),
      tipo: new FormControl(TipoProfissional.Enfermeiro, { validators: [Validators.required] }),
      fimExpediente: new FormControl(0, { validators: [Validators.required, this.validarFimExpediente] }),
      inicioExpediente: new FormControl(0, { validators: [Validators.required] }),
      credencialDeSaude: new FormControl('', { validators: [Validators.required] }),
      diasAtendidos: new FormControl([], {validators: [Validators.required]}),
      senha: new FormControl('', { validators: [Validators.required] }),
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
}
