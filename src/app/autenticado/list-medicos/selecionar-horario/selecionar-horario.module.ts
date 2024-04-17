import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {CadastroProfissionalComponent} from "../../cadastro-profissional/cadastro-profissional.component";
import {SelecionarHorarioComponent} from "./selecionar-horario.component";
import { SelecionarHorarioService } from './selecionar-horario.service';
import { HttpMedicalyModule } from '../../../http-medicaly.module';

const routes: Routes = [
  { path: '', component: SelecionarHorarioComponent }
];

@NgModule({
  declarations: [SelecionarHorarioComponent],
  exports:[SelecionarHorarioComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    HttpMedicalyModule
  ],
  providers:[SelecionarHorarioService]
})
export class SelecionarHorarioModule { }
