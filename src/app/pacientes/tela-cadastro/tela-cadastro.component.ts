import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-tela-cadastro',
  templateUrl: './tela-cadastro.component.html',
  styleUrl: './tela-cadastro.component.scss'
})

export class TelaCadastroComponent {
  constructor(private formBuilder: FormBuilder) {}
  public form = this.formBuilder.group({
    nome: [null]
  })

  public imprimirForm(): void{
    console.log(this.form)
  }

}


