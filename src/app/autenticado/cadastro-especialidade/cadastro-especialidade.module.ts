import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CadastroEspecialidadeComponent} from "./cadastro-especialidade.component";
import {RouterModule, Routes} from "@angular/router";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {ReactiveFormsModule} from "@angular/forms";
import {MatButton} from "@angular/material/button";
import {MatInput} from "@angular/material/input";
import {CadastroEspecialidadeService} from "./cadastro-especialidade.service";
import {HttpMedicalyModule} from "../../http-medicaly.module";

const routes: Routes = [
  { path: '', component: CadastroEspecialidadeComponent }
];

@NgModule({
  declarations: [CadastroEspecialidadeComponent],
  imports: [
    HttpMedicalyModule,
    CommonModule,
    RouterModule.forChild(routes),
    MatFormField,
    ReactiveFormsModule,
    MatButton,
    MatInput,
    MatLabel,
  ],
  exports: [RouterModule],
  providers: [CadastroEspecialidadeService]
})
export class CadastroEspecialidadeModule { }
