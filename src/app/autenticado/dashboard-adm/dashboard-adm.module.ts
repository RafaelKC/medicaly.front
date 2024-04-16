import {NgModule} from '@angular/core';
import {DashboardAdmComponent} from "./dashboard-adm.component";
import {RouterModule, Routes} from "@angular/router";
import {CadastroProfissionalComponent} from "../cadastro-profissional/cadastro-profissional.component";

const routes: Routes = [
  { path: '', component: DashboardAdmComponent }
];


@NgModule({
  declarations: [DashboardAdmComponent],
  exports: [RouterModule],
  imports: [RouterModule.forChild(routes),]
})
export class DashboardAdmModule { }
