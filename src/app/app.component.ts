import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {TelaCadastroModule} from './nao-autenticado/pacientes/tela-cadastro/tela-cadastro.module';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {CommonModule} from "@angular/common";
import {MatIconButton} from "@angular/material/button";


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TelaCadastroModule, MatToolbarModule, MatIconModule, CommonModule, MatIconButton],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'medicaly.front';
}
