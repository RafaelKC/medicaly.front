import {Component, OnInit} from '@angular/core';
import {CPF_MASK, EnderecoInput, GenericValidators, Genero, TELEFONE_MASK} from "../../../tokens";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {TipoProfissional} from "../../../tokens/enums/tipo-profissional";
import {DiasSemana} from "../../../tokens/enums/dias-semana";
import {Expecialidade} from "../../../tokens/enums/expecialidade";

class ProfissionalForm {
  public nome: FormControl<string|null>;
  public sobrenome: FormControl<string|null>;
  public cpf: FormControl<string|null>;
  public email: FormControl<string|null>;
  public telefone: FormControl<string|null>;
  public dataNascimento: FormControl<Date|null>;
  public genero: FormControl<Genero|null>;
  public credencialDeSaude: FormControl<string|null>;
  public atuacoes: FormControl<Array<Expecialidade>|null>;
  public especialidades: FormControl<Array<Expecialidade>|null>;
  public tipo: FormControl<TipoProfissional|null>;
  public fimExpedienteExpediente: FormControl<number|null>;
  public inicioExpediente: FormControl<number|null>;
  public diasAtendidos: FormControl<DiasSemana[]|null>;
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

  constructor(private formBuilder: FormBuilder) {
  }

  public ngOnInit(): void {
    this.createForm();
    }

  public get podeProsseguir(): boolean {
    return this.profissionalForm.valid;
  }


  public serEndereco(endereco: EnderecoInput): void {
  }

  public salvar(): void {
    if (!this.podeProsseguir) return;
    this.etapaProfissionalConcluido = true;
  }

  private createForm(): void {
    this.profissionalForm = this.formBuilder.group<ProfissionalForm>({
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
      fimExpedienteExpediente: new FormControl(0, { validators: [Validators.required] }),
      inicioExpediente: new FormControl(0, { validators: [Validators.required] }),
      credencialDeSaude: new FormControl('', { validators: [Validators.required] }),
      diasAtendidos: new FormControl([], {validators: [Validators.required]})
    });
    this.carregado = true;
  }
}
