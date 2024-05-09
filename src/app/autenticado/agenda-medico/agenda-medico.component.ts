import { Component } from '@angular/core';
import {ProcedimentoOutput} from "../../../tokens/models/procedimento-output";
import {AgendaMedicoService} from "./agenda-medico.service";
import {GetListProcedimentoInput} from "../../../tokens/models/get-list-procedimento-input";
import {Router} from "@angular/router";
import {AuthenticationService} from "../../../tokens";

@Component({
  selector: 'app-agenda-medico',
  templateUrl: './agenda-medico.component.html',
  styleUrl: './agenda-medico.component.scss'
})
export class AgendaMedicoComponent {
  procedimento: ProcedimentoOutput[];

  constructor(private procedimentoService: AgendaMedicoService,
              private auth: AuthenticationService) {

  }

  getProcedimento(){
    const filter = new GetListProcedimentoInput()
    filter.profissionalId = this.auth.user?.id
    this.procedimentoService.getProcedimento(filter).subscribe(res => {
      this.procedimento=res.items;
    })
  }

  ngOnInit(){
    this.getProcedimento();
  }
}
