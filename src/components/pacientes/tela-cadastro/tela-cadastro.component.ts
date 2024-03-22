import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-tela-cadastro',
  templateUrl: './tela-cadastro.component.html',
  styleUrl: './tela-cadastro.component.scss'
})

export class TelaCadastroComponent implements OnInit{
  public carregado = false;
  public form: FormGroup;
  constructor(private formBuilder: FormBuilder) {
  }

  public ngOnInit(): void {
    this.createForm();
  }

  public createForm(): void {
      this.form = this.formBuilder.group({
        nome: [null],
        sobrenome: [null],
        cpf: [null],
        email: [null, Validators.email],
        telefone: [null],
        dataNascimento: [null],
        genero: [null]
      });
      this.carregado = true;
  }

}


