import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrl: './user-info.component.scss'
})
export class UserInfoComponent implements OnInit {
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

