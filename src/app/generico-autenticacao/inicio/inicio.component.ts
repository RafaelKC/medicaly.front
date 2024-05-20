import {Component} from '@angular/core';
import {AuthenticationService} from "../../../tokens";

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.scss'
})
export class InicioComponent {

  constructor(public auth: AuthenticationService) {
  }
}
