import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CadastroAdministradorComponent} from "./cadastro-administrador.component";
import {RouterModule, Routes} from "@angular/router";
import {EnderecoFormModule} from "../../components/endereco-form/endereco-form.module";
import {MatFormField, MatLabel, MatSuffix} from "@angular/material/form-field";
import {IMaskDirective} from "angular-imask";
import {MatRadioButton, MatRadioGroup} from "@angular/material/radio";
import {MatDatepicker, MatDatepickerInput, MatDatepickerToggle} from "@angular/material/datepicker";
import {ReactiveFormsModule} from "@angular/forms";
import {CreateAdministradorService} from "./create-administrador.service";
import {MatButton} from "@angular/material/button";
import {MatInput} from "@angular/material/input";
import {HttpMedicalyModule} from "../../http-medicaly.module";

const routes: Routes = [
  { path: '', component: CadastroAdministradorComponent }
];


@NgModule({
  declarations: [CadastroAdministradorComponent],
  imports: [
    HttpMedicalyModule,
    CommonModule,
    EnderecoFormModule,
    IMaskDirective,
    MatButton,
    MatDatepicker,
    MatDatepickerInput,
    MatDatepickerToggle,
    MatFormField,
    MatInput,
    MatLabel,
    MatRadioButton,
    MatRadioGroup,
    MatSuffix,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
  providers: [CreateAdministradorService]
})
export class CadastroAdministradorModule { }
