import {NgModule} from '@angular/core';
import {DashboardAdmComponent} from "./dashboard-adm.component";
import {RouterModule, Routes} from "@angular/router";
import {MatTab, MatTabGroup} from "@angular/material/tabs";
import {DashboardPacientesComponent} from "./dashboard-pacientes/dashboard-pacientes.component";
import {DashboardPacientesServiceService} from "./dashboard-pacientes/dashboard-pacientes-service.service";

const routes: Routes = [
  { path: '', component: DashboardAdmComponent }
];


@NgModule({
  declarations: [DashboardAdmComponent],
  exports: [RouterModule],
  imports: [RouterModule.forChild(routes), MatTabGroup, MatTab, DashboardPacientesComponent,],
  providers: [DashboardPacientesServiceService]
})
export class DashboardAdmModule { }
