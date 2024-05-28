import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MeusProcedimentosComponent} from "./meus-procedimentos.component";
import {RouterModule, Routes} from "@angular/router";
import {MeusProcedimentosService} from "./meus-procedimentos.service";
import {HttpMedicalyModule} from "../../../http-medicaly.module";

const routes: Routes = [
  {path: '', component: MeusProcedimentosComponent}
]

@NgModule({
  declarations: [MeusProcedimentosComponent],
  exports: [RouterModule],
  imports: [
    HttpMedicalyModule,
    CommonModule,
    RouterModule.forChild(routes),
  ],
  providers: [MeusProcedimentosService]
})
export class MeusProcedimentosModule { }






