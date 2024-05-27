import {Component, ElementRef, Inject, OnInit, ViewChild} from '@angular/core';
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
import {AnexosService} from "../../../../tokens/services/anexos.service";
import {ResultadoService} from "../resultado.service";
import {ResultadoInput} from "../../../../tokens/models/resultado-input";
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {ResultadoAnexoInput} from "../../../../tokens/models/resultado-anexo-input";
import {HttpMedicalyModule} from "../../../http-medicaly.module";
import {ResultadoOutput} from "../../../../tokens/models/resultado-output";
import {dA} from "@fullcalendar/core/internal-common";


export interface DialogData {
  procedimento: ProcedimentoOutput;
  evento: EventImpl;
  resultado: ResultadoOutput|null;
}
class ProcedimentoForm {
  observacoes: FormControl<string | null | undefined>;

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
    UploadIcon,
    ReactiveFormsModule,
    HttpMedicalyModule
  ],
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.scss'
})



export class DialogComponent implements OnInit{
  showFinalizar: boolean = this.data.procedimento.status == StatusProcedimento.Finalizado;
  public procedimentoForm: FormGroup<ProcedimentoForm>


  @ViewChild("uploadInput") uploadInput: ElementRef<HTMLInputElement>;
  uploadClicado: boolean = true;
  protected fileName: string;

  protected resultado: ResultadoInput = new ResultadoInput();
  private file: File | null = null;

  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData,
              public dialogref: DialogRef<DialogComponent>,
              public procedimentoService: ProcedimentoService,
              public anexoService: AnexosService,
              public resltadoService: ResultadoService,
              public formBuilder: FormBuilder) {}


  public ngOnInit(): void {
    if (this.data.resultado != null) {
      this.resultado = this.data.resultado;
    }
    this.createForm()

    if (this.data.procedimento.status == StatusProcedimento.Finalizado) {
      this.procedimentoForm?.get('observacoes')?.setValue(this.data.resultado?.observacoes);
      this.procedimentoForm.disable();
    }
  }

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
    if (status==2){return 'Cancelado'}
    return "Finalizado"
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
    this.uploadClicado = !this.uploadClicado
    this.file = inputNode.files[0]


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

  cancelarProcedimento(p: ProcedimentoInput) {
    p.status = StatusProcedimento.Cancelado
    this.procedimentoService.update(p.id, p).subscribe()
  }

  createForm(){
    this.procedimentoForm = this.formBuilder.group<ProcedimentoForm>({
      observacoes: new FormControl(this.resultado.observacoes)
  })


  }

  finalizarProcedimento(p: ProcedimentoInput) {
    const resultado = {
      procedimentoId: p.id,
      observacoes: this.procedimentoForm?.get('observacoes')?.value,
    } as ResultadoInput

    p.status = StatusProcedimento.Finalizado

    this.procedimentoService.update(p.id, p).subscribe()

    this.resltadoService.create(resultado).subscribe()

    if(this.file!=null){
      this.anexoService.upload(this.file, p.id).subscribe()
    }
    const resultadoAnexo = {idResultado: p.id, idAnexo: p.id} as ResultadoAnexoInput
    this.resltadoService.createResultadoAnexo(resultadoAnexo).subscribe()
    this.procedimentoForm.disable();

  }
}
