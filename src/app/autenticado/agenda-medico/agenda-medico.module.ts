import {NgModule} from '@angular/core';
import {CommonModule, DatePipe} from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {AgendaMedicoComponent} from "./agenda-medico.component";
import {AgendaMedicoService} from "./agenda-medico.service";
import {
  MatCard,
  MatCardActions,
  MatCardContent,
  MatCardHeader,
  MatCardImage,
  MatCardModule,
  MatCardSubtitle,
  MatCardTitle
} from "@angular/material/card";
import {FullCalendarModule} from '@fullcalendar/angular';
import {MatDialogContent, MatDialogModule, MatDialogTitle} from "@angular/material/dialog";
import {MatButton, MatFabButton} from "@angular/material/button";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {ReactiveFormsModule} from "@angular/forms";
import {CdkTextareaAutosize} from "@angular/cdk/text-field";
import {UploadIcon} from "primeng/icons/upload";
import {MatIcon} from "@angular/material/icon";
import {MatInput} from "@angular/material/input";
import {HttpMedicalyModule} from "../../http-medicaly.module";
import {ProcedimentoDialogComponent} from "./procedimento-dialog/procedimento-dialog.component";
import {ProcedimentoService} from "./procedimento.service";
import {ResultadoService} from "./resultado.service";
import {AnexosService} from "../../../tokens/services/anexos.service";

const routes: Routes =  [
  {path: '', component: AgendaMedicoComponent}
]

@NgModule({
  declarations: [AgendaMedicoComponent, ProcedimentoDialogComponent],
  exports: [RouterModule],
  imports: [
    HttpMedicalyModule,
    CommonModule,
    RouterModule.forChild(routes),
    MatCard,
    MatDialogModule,
    MatCardHeader,
    MatCardActions,
    MatCardModule,
    FullCalendarModule,
    MatDialogContent,
    MatDialogTitle,
    MatCard,
    MatCardContent,
    MatCardHeader,
    MatCardImage,
    MatCardSubtitle,
    MatCardTitle,
    DatePipe,
    MatButton,
    MatIcon,
    MatFabButton,
    CommonModule,
    MatFormField,
    MatInput,
    MatLabel,
    CdkTextareaAutosize,
    UploadIcon,
    ReactiveFormsModule,
  ],
  providers: [AgendaMedicoService, ProcedimentoService,  ResultadoService, AnexosService],
  bootstrap: [AgendaMedicoComponent, ProcedimentoDialogComponent]
})
export class AgendaMedicoModule { }
