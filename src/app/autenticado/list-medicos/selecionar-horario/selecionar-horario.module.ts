import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
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
import {MatCalendar} from "@angular/material/datepicker";
import {FormControl, ReactiveFormsModule} from "@angular/forms";
import {TimeSelectModule} from "../../../components/time-select/time-select.module";
import {SelecionarHorarioService} from "./selecionar-horario.service";
import {HttpMedicalyModule} from "../../../http-medicaly.module";

const routes: Routes = [
  { path: '', component: SelecionarHorarioComponent }
];

@NgModule({
  declarations: [SelecionarHorarioComponent],
  imports: [
    HttpMedicalyModule,
    CommonModule,
    RouterModule.forChild(routes),
    MatCard,
    MatCardHeader,
    MatCardContent,
    MatCardActions,
    MatCardImage,
    MatButton,
    MatCardModule,
    MatCalendar,
    ReactiveFormsModule,
    TimeSelectModule,
  ],
  providers:[SelecionarHorarioService]

})
export class SelecionarHorarioModule {

}



