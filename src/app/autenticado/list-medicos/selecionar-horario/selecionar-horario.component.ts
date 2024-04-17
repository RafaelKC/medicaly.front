import { Component, Input, OnInit } from '@angular/core';
import { SelecionarHorarioService } from './selecionar-horario.service';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs';
import { stringIsNullOrEmptyOrWhitespace } from '../../../../tokens';

@Component({
  selector: 'app-selecionar-horario',
  templateUrl: './selecionar-horario.component.html',
  styleUrl: './selecionar-horario.component.scss'
})
export class SelecionarHorarioComponent implements OnInit{
  id: string;
  constructor( public selecionarService: SelecionarHorarioService, private route: ActivatedRoute, private router: Router){}

  ngOnInit(){
    this.route.parent?.params.pipe(first()).subscribe(params => {
      const id = params['id']; // (+) converts string 'id' to a number
      if (stringIsNullOrEmptyOrWhitespace(id)) {
        this.router.navigate(['/auth/list-medicos'])
      } else {
        this.id = id;
      }
    });
  }

}
