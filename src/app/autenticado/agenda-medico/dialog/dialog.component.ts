import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogContent, MatDialogTitle} from "@angular/material/dialog";
import {ProcedimentoOutput} from "../../../../tokens/models/procedimento-output";
import {EventImpl} from "@fullcalendar/core/internal";
import {
    MatCard,
    MatCardContent,
    MatCardHeader,
    MatCardImage,
    MatCardSubtitle,
    MatCardTitle
} from "@angular/material/card";
import {DatePipe} from "@angular/common";
import {MatButton} from "@angular/material/button";
import {DialogRef} from "@angular/cdk/dialog";


export interface DialogData {
  procedimento: ProcedimentoOutput;
  evento: EventImpl;
}

@Component({
  selector: 'app-dialog',
  standalone: true,
  imports: [
    MatDialogContent,
    MatDialogTitle,
    MatCard,
    MatCardContent,
    MatCardHeader,
    MatCardImage,
    MatCardSubtitle,
    MatCardTitle,
    DatePipe,
    MatButton
  ],
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.scss'
})



export class DialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData, public dialogref: DialogRef<DialogComponent>) {}

  genero(genero: number) {
    if (genero==0){return 'Masculino'}
    if (genero==1){return 'Feminino'}
    return "Outro"
  }

  tipoProcedimento(tipoProcedimento: number) {
    if (tipoProcedimento==0){return 'Cirurgia'}
    if (tipoProcedimento==1){return 'Consulta'}
    if (tipoProcedimento==2){return 'Exame'}
    return "Emergencia"
  }

  statusProcedimento(status: number) {
    if (status==0){return 'Ativo'}
    if (status==1){return 'Em Andamento'}
    return "Cancelado"
  }
}
