import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { VerAgendamentoPacienteComponent } from './ver-agendamento-paciente.component';
import { VerAgendamentoService } from './ver-agendamento.service';
import { HttpMedicalyModule } from '../../http-medicaly.module';
import { MatCardModule } from '@angular/material/card';
import { ButtonModule } from 'primeng/button';
import { MatButton } from '@angular/material/button';
import {ProgressSpinnerModule} from "primeng/progressspinner";


const routes: Routes = [
  {path: '', component: VerAgendamentoPacienteComponent}
]

@NgModule({
  declarations: [VerAgendamentoPacienteComponent],
  exports:[RouterModule],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    HttpMedicalyModule,
    MatCardModule,
    MatButton,
    ProgressSpinnerModule,

  ],
  providers:[VerAgendamentoService]
})
export class VerAgendamentoPacienteModule { }
