import {Component, OnInit} from '@angular/core';
import {Params, Router, RouterModule, RouterOutlet} from '@angular/router';
import {TelaCadastroModule} from './nao-autenticado/pacientes/tela-cadastro/tela-cadastro.module';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule, MatIconRegistry} from '@angular/material/icon';
import {CommonModule} from "@angular/common";
import {MatButtonModule, MatIconButton} from "@angular/material/button";
import {MatSidenavModule} from "@angular/material/sidenav";
import {ContatoModule} from "./generico-autenticacao/contato/contato.module";
import {DomSanitizer} from "@angular/platform-browser";
import {MAT_DATE_LOCALE, provideNativeDateAdapter} from "@angular/material/core";
import {AuthenticationService, UserTipo} from "../tokens";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {faRightFromBracket} from "@fortawesome/free-solid-svg-icons";
import {LoginModule} from "./nao-autenticado/login/login.module";
import {HttpMedicalyModule} from "./http-medicaly.module";
import {ToastModule} from "primeng/toast";
import {RippleModule} from "primeng/ripple";
import {MessageService} from "primeng/api";
import {MessageModule} from "primeng/message";
import {MessagesModule} from "primeng/messages";


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    TelaCadastroModule,
    MatToolbarModule,
    MatIconModule,
    CommonModule,
    MatIconButton,
    MatSidenavModule,
    MatButtonModule,
    RouterModule,
    ContatoModule,
    FontAwesomeModule,
    LoginModule,
    HttpMedicalyModule,
    ToastModule,
    RippleModule,
    MessageModule,
    MessagesModule,
  ],
  providers: [
    provideNativeDateAdapter(),
    { provide: MAT_DATE_LOCALE, useValue: 'pt-BR' },
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})


export class AppComponent {
  public sairIcon = faRightFromBracket;

  public loginPacienteParams = {
    tipoUsuario: UserTipo.Paciente
  } as Params;

  constructor(
    private router: Router,
    private iconRegistry: MatIconRegistry,
    private sanitizer: DomSanitizer,
    public authentication: AuthenticationService,
  ){
    this.iconRegistry.addSvgIcon(
      'medicaly-logo',
      this.sanitizer.bypassSecurityTrustResourceUrl('assets/medicaly-logo.svg'))
  }

  public navegar(link: string[], queryParams: Params | undefined = undefined): void{
    this.router.navigate(link, { queryParams,  })
  }

  public getTipoUsurio(): string {
    switch (this.authentication.user?.tipo) {
      case UserTipo.Administrador: {
        return 'Administrador';
      }
      case UserTipo.Paciente: {
        return 'Paciente';
      }
      case UserTipo.ProfissionalSaude: {
        return 'Profissional';
      }
      default: {
        return ''
      }
    }
  }
}
