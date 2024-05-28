import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TelaCadastroComponent} from './tela-cadastro.component';
import {ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatButton} from "@angular/material/button";
import {MatRadioGroup, MatRadioModule} from '@angular/material/radio';
import {IMaskModule} from 'angular-imask';
import {RadioButtonModule} from "primeng/radiobutton";
import {RouterModule, Routes} from "@angular/router";
import {EnderecoFormModule} from "../../../components/endereco-form/endereco-form.module";

const routes: Routes = [
  { path: '', component: TelaCadastroComponent }
];

@NgModule({
  declarations: [TelaCadastroComponent],
  exports: [RouterModule],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatButton,
    MatRadioModule,
    IMaskModule,
    RadioButtonModule,
    EnderecoFormModule,
    RouterModule.forChild(routes),
    MatRadioGroup,
  ],
})
export class TelaCadastroModule { }
