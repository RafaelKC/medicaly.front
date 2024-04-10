import { Component } from '@angular/core';
import { PacienteInput } from '../../../../tokens/models/paciente-input';
import { EnderecoInput } from '../../../../tokens/models/endereco-input';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TelaCadastroService } from './tela-cadastro.service';

@Component({
  selector: 'app-tela-cadastro',
  templateUrl: './tela-cadastro.component.html',
  styleUrl: './tela-cadastro.component.scss',
})
export class TelaCadastroComponent {
  public etapaUsuario = true;
  public paciente: PacienteInput;
  public endereco: EnderecoInput;
  public form: FormGroup;
  constructor(
    private fb: FormBuilder,
    private telaCadastroService: TelaCadastroService
  ) {
    this.form = this.fb.group({
      nome: ['', Validators.required],
      sobrenome: ['', Validators.required],
      cpf: ['', Validators.required],
      dataNascimento: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      telefone: ['', Validators.required],
      genero: ['', Validators.required],
    });
  }

  public setPaciente(paciente: PacienteInput): void {
    this.paciente = paciente;
    this.etapaUsuario = false;
  }

  public serEndereco(endereco: EnderecoInput): void {
    this.endereco = endereco;
    console.log(endereco);
    console.log(this.paciente);
  }

  get podeSalvar(): boolean {
    return this.form.valid;
  }

  salvar(): void {
    if (this.podeSalvar) {
      // Crie um objeto PacienteInput com os dados do formulário
      const paciente: PacienteInput = {
        nome: this.form.get('nome')?.value,
        sobrenome: this.form.get('sobrenome')?.value,
        cpf: this.form.get('cpf')?.value,
        dataNascimento: this.form.get('dataNascimento')?.value,
        email: this.form.get('email')?.value,
        telefone: this.form.get('telefone')?.value,
        genero: this.form.get('genero')?.value,
        enderecoId: null,
        id: '',
      };

      // Chame o serviço para criar o paciente no banco de dados
      this.telaCadastroService.createPaciente(paciente).subscribe(
        (response) => {
          // Lógica de sucesso
          console.log('Paciente criado com sucesso:', response);
        },
        (error) => {
          // Lógica de tratamento de erro
          console.error('Erro ao criar paciente:', error);
        }
      );
    }
  }
}
