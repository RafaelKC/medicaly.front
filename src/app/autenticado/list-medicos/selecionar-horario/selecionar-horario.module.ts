import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {CadastroProfissionalComponent} from "../../cadastro-profissional/cadastro-profissional.component";
import {SelecionarHorarioComponent} from "./selecionar-horario.component";
import {
  MatCard,
  MatCardActions,
  MatCardContent,
  MatCardHeader,
  MatCardImage,
  MatCardModule
} from "@angular/material/card";
import {MatButton} from "@angular/material/button";
import {HttpMedicalyModule} from "../../../http-medicaly.module";
import {MatCalendar} from "@angular/material/datepicker";
import {FormControl, ReactiveFormsModule} from "@angular/forms";
import {TimeSelectModule} from "../../../components/time-select/time-select.module";
import {DiasSemana, Genero, TipoProfissional} from "../../../../tokens";

const routes: Routes = [
  { path: '', component: SelecionarHorarioComponent }
];

@NgModule({
  declarations: [SelecionarHorarioComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatCard,
    MatCardHeader,
    MatCardContent,
    MatCardActions,
    MatCardImage,
    MatButton,
    HttpMedicalyModule,
    MatCardModule,
    MatCalendar,
    ReactiveFormsModule,
    TimeSelectModule,
  ],
  providers:[SelecionarHorarioService]

})
export class SelecionarHorarioModule {

}



