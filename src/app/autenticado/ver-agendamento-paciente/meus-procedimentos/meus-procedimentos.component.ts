import {Component} from '@angular/core';
import {FormBuilder} from "@angular/forms";
import {MeusProcedimentosService} from "./meus-procedimentos.service";
import {ProcedimentoOutput} from "../../../../tokens/models/procedimento-output";
import {first} from "rxjs";
import {ActivatedRoute} from "@angular/router";
import {ProfissionalOutput} from "../../../../tokens/models/profissional-output";

@Component({
  selector: 'app-meus-procedimentos',
  templateUrl: './meus-procedimentos.component.html',
  styleUrl: './meus-procedimentos.component.scss'
})
export class MeusProcedimentosComponent {
  public procedimentos: ProcedimentoOutput;
  public profissional: ProfissionalOutput;
  constructor(private meusProcedimentosService: MeusProcedimentosService, private route: ActivatedRoute,) {
  }

  ngOnInit(){
    this.route.parent?.params.pipe(first()).subscribe(params => {
      const id = params['id'];
      this.getProcedimento(id)




    })
  }

  getProfissional(id: string): void{
    this.meusProcedimentosService.getProfissional(id).subscribe(res => {
      this.profissional = res
    })
  }

  getProcedimento(id: string): void {
      this.meusProcedimentosService.getProcedimento(id).subscribe(res => {
        this.procedimentos = res
        if (this.procedimentos && this.procedimentos.idProfissional){
          this.getProfissional(this.procedimentos.idProfissional)
        }
      })
  }
}
