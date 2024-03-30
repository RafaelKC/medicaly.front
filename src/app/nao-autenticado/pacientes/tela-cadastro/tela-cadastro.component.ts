import {Component} from '@angular/core';
import {PacienteInput} from "../../../../tokens/models/paciente-input";
import {EnderecoInput} from "../../../../tokens/models/endereco-input";

@Component({
  selector: 'app-tela-cadastro',
  templateUrl: './tela-cadastro.component.html',
  styleUrl: './tela-cadastro.component.scss'
})

export class TelaCadastroComponent {
  public etapaUsuario = true
  public paciente: PacienteInput;
  public endereco: EnderecoInput;

  public setPaciente(paciente: PacienteInput): void {
    this.paciente = paciente;
    this.etapaUsuario = false;
  }

  public serEndereco(endereco: EnderecoInput): void {
    this.endereco = endereco;
    console.log(endereco)
  }

}


