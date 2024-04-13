import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CadastroProfissionalComponent} from "./cadastro-profissional.component";
import {RouterModule, Routes} from "@angular/router";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatFormField, MatLabel, MatSuffix} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatRadioButton, MatRadioGroup} from "@angular/material/radio";
import {MatDatepicker, MatDatepickerInput, MatDatepickerToggle} from "@angular/material/datepicker";
import {IMaskDirective} from "angular-imask";
import {SelectModule} from "../../components/select/select.module";
import {MatButton} from "@angular/material/button";
import {TimeSelectModule} from "../../components/time-select/time-select.module";
import {EnderecoFormModule} from "../../components/endereco-form/endereco-form.module";
import {CreateProfissionalService} from "./create-profissional.service";
import {HttpMedicalyModule} from "../../http-medicaly.module";

const routes: Routes = [
  { path: '', component: CadastroProfissionalComponent }
];

@NgModule({
  declarations: [CadastroProfissionalComponent],
  exports: [RouterModule],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    MatFormField,
    MatInput,
    MatLabel,
    MatRadioButton,
    MatRadioGroup,
    MatDatepicker,
    MatDatepickerInput,
    MatDatepickerToggle,
    MatSuffix,
    IMaskDirective,
    SelectModule,
    MatButton,
    TimeSelectModule,
    EnderecoFormModule,
    HttpMedicalyModule
  ],
  providers: [CreateProfissionalService]
})
export class CadastroProfissionalModule { }
