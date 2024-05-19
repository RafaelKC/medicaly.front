import {Component} from '@angular/core';
import {FormBuilder} from "@angular/forms";
import {MeusProcedimentosService} from "./meus-procedimentos.service";
import {ProcedimentoOutput} from "../../../../tokens/models/procedimento-output";
import {first} from "rxjs";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-meus-procedimentos',
  templateUrl: './meus-procedimentos.component.html',
  styleUrl: './meus-procedimentos.component.scss'
})
export class MeusProcedimentosComponent {
  public procedimentos: ProcedimentoOutput;

  constructor(private meusProcedimentosService: MeusProcedimentosService, private route: ActivatedRoute,) {
  }

  ngOnInit(){
    this.route.parent?.params.pipe(first()).subscribe(params => {
      const id = params['id'];
      this.getProcedimentos(id)
    })
  }

  getProcedimentos(id: string): void {

      this.meusProcedimentosService.getProcedimento(id).subscribe(res => {
        this.procedimentos = res
      })
  }
}
