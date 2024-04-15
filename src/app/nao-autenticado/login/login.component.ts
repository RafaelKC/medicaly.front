import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthenticationService, LoginInput, UserTipo} from "../../../tokens";
import {catchError, first, of, switchMap} from "rxjs";
import {LoginService} from "./login.service";
import {MessageService} from "primeng/api";

interface LoginForm {
  email: FormControl<string | null>,
  password: FormControl<string | null>,
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit{
  public loginForm: FormGroup<LoginForm>;
  public carregado = false;
  public salvando = false;

  private tipoUsuario: UserTipo;

  constructor(private _fb: FormBuilder,
              private router: ActivatedRoute,
              private loginService: LoginService,
              private messageService: MessageService,
              private authentication: AuthenticationService){}

  public ngOnInit(): void {
    this.setForm();
    this.setTipoUsuario();
  }

  public get podeSalvar(): boolean {
    return this.loginForm.valid && !this.salvando;
  }

  public onSubmit(): void{
    if(!this.podeSalvar) return;
    this.salvando = true;
    const input = this.loginForm.value as LoginInput;
    this.loginService.login(input, this.tipoUsuario)
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
  }

  private setForm(): void {
   this.loginForm = this._fb.group({
     email: new FormControl('', [Validators.required, Validators.email]),
     password: new FormControl('', [Validators.required]),
   });
  }

  private setTipoUsuario(): void {
    this.router.queryParams
      .pipe(first())
      .subscribe({
        next: (params) => {
          this.tipoUsuario = params['tipoUsuario'] as UserTipo;
          if(this.tipoUsuario) {
            this.carregado = true;
          }
        }
      });
  }

  private setFormError(): void {
    this.salvando = false;
    this.messageService.add({ severity: 'error', summary: 'Erro ao fazer login' })
    this.loginForm.controls.email.setErrors({ invalid: true });
    this.loginForm.controls.password.setErrors({ invalid: true });
  }
}
