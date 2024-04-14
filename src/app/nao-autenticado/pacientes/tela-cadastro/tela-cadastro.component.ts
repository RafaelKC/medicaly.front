import {Component, EventEmitter, OnInit, Output, input} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {PacienteInput} from "../../../../tokens/models/paciente-input";
import {Genero} from "../../../../tokens/enums/genero";
import {CPF_MASK} from "../../../../tokens/masks/cpf.mask";
import {GenericValidators} from "../../../../tokens/utils/generic-validators.util";
import {TELEFONE_MASK} from "../../../../tokens/masks/telefone.mask";
import { AuthenticationService, CreateUserInput, EnderecoInput, LoginInput, UserTipo } from '../../../../tokens';
import { TelaCadastroService } from './tela-cadastro.service';
import { first, of, switchMap } from 'rxjs';
import {Router} from '@angular/router'
import { LoginService } from '../../login/login.service';

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
  providers:[LoginService]
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
  public etapaUsuario = true
  private userTipo = UserTipo.Paciente;

  constructor(private formBuilder: FormBuilder, private service: TelaCadastroService, private loginService: LoginService, private authentication: AuthenticationService, private router: Router) {
  }

  public ngOnInit(): void {
    this.createForm();
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
    console.log(createInput)
    console.log(createInput.endereco)
    console.log(createInput.user)
    console.log(createInput.password)

    this.service.createPaciente(createInput).pipe(first()).subscribe({
      next: () => {
        this.router.navigate(['/'])
      }
    });
  }

  public salvar(): void {
    if (!this.podeSalvar) return;

    const input = this.form.value as LoginInput;
    this.loginService.login(input, this.userTipo)
      .pipe(
        first(),
        switchMap(resultado => {
          if (resultado.success) {
            return this.authentication.setToken(resultado.token)
          }
          return of(false);
        }),
        first(),
        )
      .subscribe({
        next: (resultado) => {
          if (!resultado) {
            this.setFormError()
          }
        },
        error: () => this.setFormError()
      })
    
    const user = this.form.value as PacienteInput;
    this.setPaciente.next(user);
    this.etapaUsuario = false
  }


  public createForm(): void {
      this.form = this.formBuilder.group<PacienteForm>({
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
        senha: new FormControl('', { validators: [Validators.required] })
      }),
     
      this.carregado = true;
  }

  private setFormError(): void {
    this.form.controls.email.setErrors({ invalid: true });
    this.form.controls.senha.setErrors({ invalid: true });
  }
}

