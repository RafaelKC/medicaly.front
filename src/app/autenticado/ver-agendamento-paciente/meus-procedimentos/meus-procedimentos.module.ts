import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MeusProcedimentosComponent} from "./meus-procedimentos.component";
import {RouterModule, Routes} from "@angular/router";
import {HttpMedicalyModule} from "../../../http-medicaly.module";
import {MeusProcedimentosService} from "./meus-procedimentos.service";

const routes: Routes = [
  {path: '', component: MeusProcedimentosComponent}
]

@NgModule({
  declarations: [MeusProcedimentosComponent],
  exports: [RouterModule],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    HttpMedicalyModule
  ],
  providers: [MeusProcedimentosService]
})
export class MeusProcedimentosModule { }






