import { Component } from '@angular/core';
import { ProfissionalInput } from '../../../tokens/models/profissional-input';
import { HttpClient } from '@angular/common/http';
import { ListMedicosService } from './list-medicos.service';
import { response } from 'express';


@Component({
  selector: 'app-list-medicos',
  templateUrl: './list-medicos.component.html',
  styleUrl: './list-medicos.component.scss'
})
export class ListMedicosComponent {
  public medicos: ProfissionalInput[]

  constructor(http: HttpClient, private listService: ListMedicosService){

  }

  ngOnInit(){
    this.listService.getProfissionais(10).subscribe((response) => {
      this.medicos = response.items
      console.log(response)
    })
  }
}
