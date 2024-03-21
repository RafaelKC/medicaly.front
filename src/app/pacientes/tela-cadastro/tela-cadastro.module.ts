import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TelaCadastroComponent } from './tela-cadastro.component';
import {ReactiveFormsModule } from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';



@NgModule({
  declarations: [TelaCadastroComponent,],
  exports: [TelaCadastroComponent],

  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule
  ]
})
export class TelaCadastroModule { }
