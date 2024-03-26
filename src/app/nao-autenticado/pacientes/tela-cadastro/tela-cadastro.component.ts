import {Component} from '@angular/core';
import {PacienteInput} from "../../../../tokens/models/paciente-input";

@Component({
  selector: 'app-tela-cadastro',
  templateUrl: './tela-cadastro.component.html',
  styleUrl: './tela-cadastro.component.scss'
})

export class TelaCadastroComponent {
  public etapaUsuario = true
  public paciente: PacienteInput;

  public setPaciente(paciente: PacienteInput) {
    this.paciente = paciente;
    this.etapaUsuario = false;
  }

}


