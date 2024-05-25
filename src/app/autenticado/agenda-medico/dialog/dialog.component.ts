import {Component, ElementRef, Inject, ViewChild} from '@angular/core';
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
import {CommonModule, DatePipe} from "@angular/common";
import {MatButton, MatFabButton} from "@angular/material/button";
import {DialogRef} from "@angular/cdk/dialog";
import {MatIcon} from "@angular/material/icon";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {CdkTextareaAutosize} from "@angular/cdk/text-field";
import {UploadIcon} from "primeng/icons/upload";
import {ProcedimentoService} from "../procedimento.service";
import {ProcedimentoInput} from "../../../../tokens/models/procedimento";
import {StatusProcedimento} from "../../../../tokens/enums/status-procedimento";


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
    MatButton,
    MatIcon,
    MatFabButton,
    CommonModule,
    MatFormField,
    MatInput,
    MatLabel,
    CdkTextareaAutosize,
    UploadIcon
  ],
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.scss'
})



export class DialogComponent {
  showFinalizar: boolean = false;
  protected srcResult: any;



  @ViewChild("uploadInput") uploadInput: ElementRef<HTMLInputElement>;
  uploadClicado: boolean = true;
  protected fileName: string;
  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData,
              public dialogref: DialogRef<DialogComponent>,
              public procedimentoService: ProcedimentoService) {}

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

  showFinalizarDiv(){
    this.showFinalizar = !this.showFinalizar
  }

  artigo(tipoProcedimento: number) {
    if (tipoProcedimento==2){return 'o'}
    return "a"
  }

  limitCaracteres(s: string) {
    if (s.length > 17) {
      return s.substring(0, 17) + '...';
    } else {
      return s;
    }
  }

  onFileSelected() {
    const inputNode: any = this.uploadInput.nativeElement;
    this.fileName = this.limitCaracteres(inputNode.files[0].name);
    if (typeof (FileReader) !== 'undefined') {
      const reader = new FileReader();

      reader.onload = (e: any) => {
        this.srcResult = e.target.result;
      };

      reader.readAsArrayBuffer(inputNode.files[0]);
      this.uploadClicado = !this.uploadClicado

    }
  }

  uploadClicked(event: Event) {

    event.preventDefault()
    if(!this.uploadClicado){
      this.uploadClicado = !this.uploadClicado
      this.fileName=''
    }else {
      this.uploadInput.nativeElement.click()
    }
  }

  cancelarProcedimento(id: string, p: ProcedimentoInput) {
    p.status = StatusProcedimento.Cancelado
    this.procedimentoService.update(id, p).subscribe()
  }
}
