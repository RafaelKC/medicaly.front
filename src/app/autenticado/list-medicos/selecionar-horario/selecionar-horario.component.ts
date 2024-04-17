import { Component, OnInit } from '@angular/core';
import { SelecionarHorarioService } from './selecionar-horario.service';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs';
import { stringIsNullOrEmptyOrWhitespace } from '../../../../tokens';
import { ProfissionalInput } from '../../../../tokens/models/profissional-input';


@Component({
  selector: 'app-selecionar-horario',
  templateUrl: './selecionar-horario.component.html',
  styleUrls: ['./selecionar-horario.component.scss']
})
export class SelecionarHorarioComponent implements OnInit {
  id: string;
  medico: ProfissionalInput; // Adicionando uma propriedade para armazenar as informações do médico

  constructor(
    private selecionarService: SelecionarHorarioService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.parent?.params.pipe(first()).subscribe(params => {
      const id = params['id'];
      if (stringIsNullOrEmptyOrWhitespace(id)) {
        this.router.navigate(['/auth/list-medicos']);
      } else {
        this.id = id;
        this.selecionarService.getProfissional(id).subscribe((medico: ProfissionalInput) => {
          this.medico = medico;
        });
      }
    });
  }
}
