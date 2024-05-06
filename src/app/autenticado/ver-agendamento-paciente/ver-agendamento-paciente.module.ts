import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { VerAgendamentoPacienteComponent } from './ver-agendamento-paciente.component';
import { VerAgendamentoService } from './ver-agendamento.service';
import { HttpMedicalyModule } from '../../http-medicaly.module';

const routes: Routes = [
  {path: '', component: VerAgendamentoPacienteComponent}
]

@NgModule({
  declarations: [VerAgendamentoPacienteComponent],
  exports:[RouterModule],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    HttpMedicalyModule
  ],
  providers:[VerAgendamentoService]
})
export class VerAgendamentoPacienteModule { }
