import {NgModule} from '@angular/core';
import {DashboardAdmComponent} from "./dashboard-adm.component";
import {RouterModule, Routes} from "@angular/router";
import {MatTab, MatTabGroup} from "@angular/material/tabs";
import {DashboardPacientesComponent} from "./dashboard-pacientes/dashboard-pacientes.component";
import {DashboardPacientesServiceService} from "./dashboard-pacientes/dashboard-pacientes-service.service";
import {DashboardProfissionalComponent} from "./dashboard-profissionais/dashboard-profissional.component";
import {DashboardProfissionaisServiceService} from "./dashboard-profissionais/dashboard-profissionais-service.service";
import {
  DashboardAdministradoresServiceService
} from "./dashboard-administradores/dashboard-administradores-service.service";
import {DashboardAdministradorComponent} from "./dashboard-administradores/dashboard-administrador.component";
import {DashboardUnidadesServiceService} from "./dashboard-unidades/dashboard-unidades-service.service";
import {DashboardUnidadeComponent} from "./dashboard-unidades/dashboard-unidade.component";
import {DashboardEspecialidadeComponent} from "./dashboard-especialidades/dashboard-especialidade.component";
import {DashboardEspecialidadeService} from "./dashboard-especialidades/dashboard-especialidade.service";
import {HttpMedicalyModule} from "../../http-medicaly.module";

const routes: Routes = [
  {path: '', component: DashboardAdmComponent}
];


@NgModule({
  declarations: [DashboardAdmComponent],
  exports: [RouterModule],
  imports: [
    RouterModule.forChild(routes),
    MatTabGroup,
    MatTab,
    HttpMedicalyModule,
    DashboardPacientesComponent,
    DashboardProfissionalComponent,
    DashboardAdministradorComponent,
    DashboardUnidadeComponent,
    DashboardEspecialidadeComponent,],
  providers: [
    DashboardPacientesServiceService,
    DashboardProfissionaisServiceService,
    DashboardAdministradoresServiceService,
    DashboardEspecialidadeService,
    DashboardUnidadesServiceService]
})
export class DashboardAdmModule {
}
