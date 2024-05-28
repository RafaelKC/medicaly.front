import {Component, ElementRef, Inject, OnInit, ViewChild} from '@angular/core';
import {ProcedimentoOutput} from "../../../../tokens/models/procedimento-output";
import {EventImpl} from "@fullcalendar/core/internal";
import {ResultadoOutput} from "../../../../tokens/models/resultado-output";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {StatusProcedimento} from "../../../../tokens/enums/status-procedimento";
import {ResultadoInput} from "../../../../tokens/models/resultado-input";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {DialogRef} from "@angular/cdk/dialog";
import {ProcedimentoService} from "../procedimento.service";
import {AnexosService} from "../../../../tokens/services/anexos.service";
import {ResultadoService} from "../resultado.service";
import {ProcedimentoInput} from "../../../../tokens/models/procedimento";
import {map, of, switchMap} from "rxjs";
import {ResultadoAnexoInput} from "../../../../tokens/models/resultado-anexo-input";

export interface DialogData {
  procedimento: ProcedimentoOutput;
  evento: EventImpl;
  resultado: ResultadoOutput|null;
}
class ProcedimentoForm {
  observacoes: FormControl<string | null | undefined>;
}

@Component({
  selector: 'app-procedimento-dialog',
  templateUrl: './procedimento-dialog.component.html',
  styleUrl: './procedimento-dialog.component.scss'
})
export class ProcedimentoDialogComponent implements OnInit {
  showFinalizar: boolean = this.data.procedimento.status == StatusProcedimento.Finalizado;
  public procedimentoForm: FormGroup<ProcedimentoForm>


  @ViewChild("uploadInput") uploadInput: ElementRef<HTMLInputElement>;
  uploadClicado: boolean = true;
  protected fileName: string;

  protected resultado: ResultadoInput = new ResultadoInput();
  private file: File | null = null;

  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData,
              public dialogref: DialogRef<ProcedimentoDialogComponent>,
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

    this.procedimentoService.update(p.id, p).pipe(
      switchMap(() => this.resltadoService.create(resultado)),
      switchMap(() =>  {
        if (this.file!=null) {
          return this.anexoService.upload(this.file, p.id).pipe(map(() => true))
        }
        return of(false);
      }),
      switchMap((temAnexo) => {
        if (temAnexo) {
          const resultadoAnexo = {ProcedimentoId: p.id, anexoId: p.id} as ResultadoAnexoInput
          return this.resltadoService.createResultadoAnexo(resultadoAnexo)
        }
        return of(void 0);
      })
    ).subscribe({
      next: () => this.procedimentoForm.disable()
    })
  }
}
