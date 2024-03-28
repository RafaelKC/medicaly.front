import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {TelaCadastroModule} from './nao-autenticado/pacientes/tela-cadastro/tela-cadastro.module';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule, MatIconRegistry} from '@angular/material/icon';
import {CommonModule} from "@angular/common";
import {MatIconButton} from "@angular/material/button";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatButtonModule} from '@angular/material/button';

import { Router, RouterModule } from '@angular/router';
import { ContatoModule } from './contato/contato.module';


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
  public svg = `<svg version="1.0" xmlns="http://www.w3.org/2000/svg"
  width="256.000000pt" height="256.000000pt" viewBox="0 0 256.000000 256.000000"
  preserveAspectRatio="xMidYMid meet">
 
 <g transform="translate(0.000000,256.000000) scale(0.100000,-0.100000)"
 fill="#000000" stroke="none">
 </g>
 </svg>`

  /*constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer){
    iconRegistry.addSvgIcon(
      'medicaly-logo',
      sanitizer.bypassSecurityTrustResourceUrl(this.svg))
  }*/
  title = 'medicaly.front';

  constructor(private router: Router){

  }
  public navegar(link: string): void{
    this.router.navigate([link])
  }

}
