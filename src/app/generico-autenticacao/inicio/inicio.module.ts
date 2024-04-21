import {NgModule} from '@angular/core';
import {InicioComponent} from "./inicio.component";
import {RouterModule, Routes} from "@angular/router";
import {HttpMedicalyModule} from "../../http-medicaly.module";
import {AnexosService} from "../../../tokens/services/anexos.service";

const routes: Routes = [
  { path: '', component: InicioComponent }
];

@NgModule({
  declarations: [InicioComponent],
  exports: [RouterModule],
  imports: [RouterModule.forChild(routes), HttpMedicalyModule],
  providers: [AnexosService]
})
export class InicioModule { }
