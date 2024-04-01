import {Component} from '@angular/core';
import {Params, Router, RouterModule, RouterOutlet} from '@angular/router';
import {TelaCadastroModule} from './nao-autenticado/pacientes/tela-cadastro/tela-cadastro.module';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule, MatIconRegistry} from '@angular/material/icon';
import {CommonModule} from "@angular/common";
import {MatButtonModule, MatIconButton} from "@angular/material/button";
import {MatSidenavModule} from "@angular/material/sidenav";
import {ContatoModule} from "./nao-autenticado/contato/contato.module";
import {DomSanitizer} from "@angular/platform-browser";
import {MAT_DATE_LOCALE, provideNativeDateAdapter} from "@angular/material/core";


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
    ContatoModule
  ],
  providers: [
    provideNativeDateAdapter(),
    { provide: MAT_DATE_LOCALE, useValue: 'pt-BR' }
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})


export class AppComponent {
  public title = 'medicaly.front';

  public loginPacienteParams = {
    tipoUsuario: 0
  } as Params;

  constructor(
    private router: Router,
    private iconRegistry: MatIconRegistry,
    private sanitizer: DomSanitizer
  ){
    this.iconRegistry.addSvgIcon(
      'medicaly-logo',
      this.sanitizer.bypassSecurityTrustResourceUrl('assets/medicaly-logo.svg'))
  }

  public navegar(link: string, queryParams: Params | undefined = undefined): void{
    this.router.navigate([link], { queryParams })
  }
}
