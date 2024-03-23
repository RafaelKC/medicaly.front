import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

export class PacienteInfo {
  public nome: string;
  public sobrenome: string;
  public cpf: string;
  public email: string;
  public telefone: string;
  public dataNascimento: string;
  public genero: string;
}

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrl: './user-info.component.scss'
})
export class UserInfoComponent implements OnInit {
  @Output() setPaciente = new EventEmitter<PacienteInfo>();
  
  public carregado = false;
  public form: FormGroup;


  constructor(private formBuilder: FormBuilder) {
  }

  public ngOnInit(): void {
    this.createForm();
  }

  public get podeSalvar(): boolean {
    return this.form.valid;
  }

  public salvar(): void {
    if (!this.podeSalvar) return;

    const user = this.form.value as PacienteInfo;
    this.setPaciente.next(user);
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

