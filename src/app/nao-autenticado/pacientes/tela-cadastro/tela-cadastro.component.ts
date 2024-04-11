import { Component } from '@angular/core';
import { PacienteInput } from '../../../../tokens/models/paciente-input';
import { EnderecoInput } from '../../../../tokens/models/endereco-input';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TelaCadastroService } from './tela-cadastro.service';
import {v4 as uuidv4} from 'uuid';
@Component({
  selector: 'app-tela-cadastro',
  templateUrl: './tela-cadastro.component.html',
  styleUrl: './tela-cadastro.component.scss',
})
export class TelaCadastroComponent {
  public etapaUsuario = true;
  public paciente: PacienteInput;
  public endereco: EnderecoInput;
  constructor(
    private fb: FormBuilder,
    private telaCadastroService: TelaCadastroService
  ) {
    
  }

  public setPaciente(paciente: PacienteInput): void {
    this.paciente = paciente;
    this.etapaUsuario = false;
  }

  public serEndereco(endereco: EnderecoInput): void {
    this.endereco = endereco;
    this.salvar();
  }


  salvar(): void {
      this.telaCadastroService.createPaciente(this.paciente).subscribe(
        (response) => {

          console.log('Paciente criado com sucesso:', this.paciente.id, this.paciente);
        },
        (error) => {
          
          console.error('Erro ao criar paciente:', error);
        }
      );
    }
  }

