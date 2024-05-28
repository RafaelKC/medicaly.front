import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {VerAgendamentoPacienteComponent} from './ver-agendamento-paciente.component';
import {VerAgendamentoService} from './ver-agendamento.service';
import {MatCardModule} from '@angular/material/card';
import {MatButton} from '@angular/material/button';
import {ProgressSpinnerModule} from "primeng/progressspinner";
import {HttpMedicalyModule} from "../../http-medicaly.module";


const routes: Routes = [
  {path: '', component: VerAgendamentoPacienteComponent}
]

@NgModule({
  declarations: [VerAgendamentoPacienteComponent],
  exports:[RouterModule],
  imports: [
    HttpMedicalyModule,
    CommonModule,
    RouterModule.forChild(routes),
    MatCardModule,
    MatButton,
    ProgressSpinnerModule,

  ],
  providers:[VerAgendamentoService]
})
export class VerAgendamentoPacienteModule { }
