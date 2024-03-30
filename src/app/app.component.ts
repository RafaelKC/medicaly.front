import {Component} from '@angular/core';
import {Router, RouterModule, RouterOutlet} from '@angular/router';
import {TelaCadastroModule} from './nao-autenticado/pacientes/tela-cadastro/tela-cadastro.module';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule, MatIconRegistry} from '@angular/material/icon';
import {CommonModule} from "@angular/common";
import {MatButtonModule, MatIconButton} from "@angular/material/button";
import {MatSidenavModule} from "@angular/material/sidenav";
import {ContatoModule} from "./nao-autenticado/contato/contato.module";
import {DomSanitizer} from "@angular/platform-browser";


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
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})


export class AppComponent {
  public title = 'medicaly.front';

  constructor(
    private router: Router,
    private iconRegistry: MatIconRegistry,
    private sanitizer: DomSanitizer
  ){
    this.iconRegistry.addSvgIcon(
      'medicaly-logo',
      this.sanitizer.bypassSecurityTrustResourceUrl('assets/medicaly-logo.svg'))
  }

  public navegar(link: string): void{
    this.router.navigate([link])
  }
}
