import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Route, RouterModule, Routes} from "@angular/router";
import {AgendaMedicoComponent} from "./agenda-medico.component";
import {HttpMedicalyModule} from "../../http-medicaly.module";
import {LoginService} from "../../nao-autenticado/login/login.service";
import {AgendaMedicoService} from "./agenda-medico.service";
import {MatCard, MatCardActions, MatCardHeader, MatCardModule} from "@angular/material/card";


const routes: Routes =  [
  {path: '', component: AgendaMedicoComponent}
]

@NgModule({
  declarations: [AgendaMedicoComponent],
  exports: [RouterModule],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    HttpMedicalyModule,
    MatCard,
    MatCardHeader,
    MatCardActions,
    MatCardModule
  ]
  , providers: [AgendaMedicoService]
})
export class AgendaMedicoModule { }
