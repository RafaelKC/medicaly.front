import { Component } from '@angular/core';
import { ProfissionalInput } from '../../../tokens/models/profissional-input';
import { HttpClient } from '@angular/common/http';
import { ListMedicosService } from './list-medicos.service';
import { response } from 'express';
import { Router } from '@angular/router';


@Component({
  selector: 'app-list-medicos',
  templateUrl: './list-medicos.component.html',
  styleUrl: './list-medicos.component.scss'
})
export class ListMedicosComponent {
  public medicos: ProfissionalInput[]
  public clicado = false
  public medico: ProfissionalInput
  public procuraNomeMedico = ''

  constructor( private listService: ListMedicosService, private route: Router){

  }

  ngOnInit(){
    this.listService.getProfissionais(10).subscribe((response) => {
      this.medicos = response.items
      console.log(response)
    })
  }



  navegar(id?: string) {
    if (id) {
      this.route.navigate(['/auth/selecionar-horario/' + id])
      this.clicado = true
      this.medico.id = id
      console.log(id)
    }
  }
}
