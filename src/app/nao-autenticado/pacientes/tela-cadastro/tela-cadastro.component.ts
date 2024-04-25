import { Component, EventEmitter, OnInit, Output, input } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { PacienteInput } from '../../../../tokens/models/paciente-input';
import { Genero } from '../../../../tokens/enums/genero';
import { CPF_MASK } from '../../../../tokens/masks/cpf.mask';
import { GenericValidators } from '../../../../tokens/utils/generic-validators.util';
import { TELEFONE_MASK } from '../../../../tokens/masks/telefone.mask';
import {
  AuthenticationService,
  CreateUserInput,
  EnderecoInput,
  LoginInput, stringIsNullOrEmptyOrWhitespace,
  UserTipo,
} from '../../../../tokens';
import { TelaCadastroService } from './tela-cadastro.service';
import { first, of, switchMap } from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';
import { LoginService } from '../../login/login.service';
import {PacienteOutput} from "../../../../tokens/models/paciente-output";
import {UnidadeAtendimentoInput} from "../../../../tokens/models/unidade-atendimento-input";
import {MessageService} from "primeng/api";

class PacienteForm {
  public nome: FormControl<string | null>;
  public sobrenome: FormControl<string | null>;
  public cpf: FormControl<string | null>;
  public email: FormControl<string | null>;
  public telefone: FormControl<string | null>;
  public dataNascimento: FormControl<Date | null>;
  public genero: FormControl<Genero | null>;
  public senha: FormControl<String | null>;
}

@Component({
  selector: 'tela-cadastro',
  templateUrl: 'tela-cadastro.component.html',
  styleUrl: 'tela-cadastro.component.scss',
  providers: [LoginService],
})
export class TelaCadastroComponent implements OnInit {
  @Output() setPaciente = new EventEmitter<PacienteInput>();

  public cpfMask = CPF_MASK;
  public telefoneMask = TELEFONE_MASK;

  public minDate: Date = new Date('01-01-1940');
  public maxDate = new Date();

  public carregado = false;
  public form: FormGroup<PacienteForm>;
  public generos = Genero;
  public etapaUsuario = true;
  private userTipo = UserTipo.Paciente;

  public editando = false;
  public paciente: PacienteOutput;

  constructor(
    private formBuilder: FormBuilder,
    private service: TelaCadastroService,
    private authentication: AuthenticationService,
    private router: Router,
    private messageService: MessageService,
    private route: ActivatedRoute
  ) {}

  public ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = params['id'];
      if (stringIsNullOrEmptyOrWhitespace(id)) {
        this.setNovoPaciente();
      } else {
        this.setPacienteEditar(id);
      }
    })
  }

  public get podeSalvar(): boolean {
    return this.form.valid;
  }

  public serEndereco(endereco: EnderecoInput): void {
    const paciente = this.form.value;
    const createInput = new CreateUserInput<PacienteInput>();
    createInput.password = this.form.value.senha as string;
    createInput.endereco = endereco;
    createInput.user = paciente as PacienteInput;

    this.service
      .createPaciente(createInput)

      .pipe(
        first(),
        switchMap((resultado) => {
          if (resultado.success) {
            return this.authentication.setToken(resultado.token);
          }
          return of(false);
        }),
        first()
      )
      .subscribe({
        next: (resultado) => {
          if (!resultado) {
            this.setFormError();
          }
          this.router.navigate(['/'])
        },
        error: () => this.setFormError(),
      });
  }

  public salvar(): void {
    if (!this.podeSalvar) return;

    if (!this.editando) {
      const user = this.form.value as PacienteInput;
      this.setPaciente.next(user);
      this.etapaUsuario = false;
    } else {
      const paciente = {
        ...this.form.value,
        enderecoId: this.paciente.enderecoId,
      } as PacienteInput;

      this.service.update(this.paciente.id, paciente).pipe(first())
        .subscribe(() => {
          this.messageService.add({ summary: 'Paciente atualizada crom sucesso', severity: 'success' });
          this.router.navigate(['/auth/dashboard-adm'])
        })
    }
  }

  public createForm(): void {
    (this.form = this.formBuilder.group<PacienteForm>({
      nome: new FormControl(this.paciente.nome, { validators: [Validators.required] }),
      sobrenome: new FormControl(this.paciente.sobrenome, { validators: [Validators.required] }),
      email: new FormControl(this.paciente.email, {
        validators: [Validators.required, Validators.email],
      }),
      telefone: new FormControl(this.paciente.telefone, {
        validators: [
          Validators.minLength(10),
          Validators.maxLength(11),
          Validators.required,
        ],
      }),
      cpf: new FormControl(this.paciente.cpf, {
        validators: [
          Validators.minLength(11),
          Validators.maxLength(11),
          Validators.required,
          GenericValidators.isValidCpf(),
        ],
      }),
      dataNascimento: new FormControl(this.paciente.dataNascimento, {
        validators: [Validators.required],
        nonNullable: true,
      }),
      genero: new FormControl(this.paciente.genero, {
        validators: [Validators.required],
      }),
      senha: new FormControl('', { validators: this.editando ? [] : [Validators.required] }),
    }))
    this.carregado = true;
  }

  private setFormError(): void {
    this.form.controls.email.setErrors({ invalid: true });
    this.form.controls.senha.setErrors({ invalid: true });
  }

  private setNovoPaciente(): void {
    this.paciente = new PacienteInput();
    this.paciente.genero = Genero.Masculino;
    this.createForm();
  }

  private setPacienteEditar(id: string): void {
    this.service.get(id).pipe(first())
      .subscribe({
        next: (paciente) => {
          this.paciente = paciente;
          this.editando = true;
          this.createForm();
        },
        error: () => this.setNovoPaciente()
      })
  }
}
