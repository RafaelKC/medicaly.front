import {Component} from '@angular/core';
import {AuthenticationService, UserTipo} from "../../../tokens";

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.scss'
})
export class InicioComponent {

  public tiposUsuarios = UserTipo;

  constructor(public auth: AuthenticationService) {
  }

  protected readonly tiposUsuario = UserTipo;
}
