import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { PacienteInfo } from './user-info/user-info.component';

@Component({
  selector: 'app-tela-cadastro',
  templateUrl: './tela-cadastro.component.html',
  styleUrl: './tela-cadastro.component.scss'
})

export class TelaCadastroComponent {
  public etapaUsuario = true
  public paciente: PacienteInfo;

  public setPaciente(paciente: PacienteInfo) {
    this.paciente = paciente;
    this.etapaUsuario = false;
  }

}


