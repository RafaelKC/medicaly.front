import {Component, OnDestroy, OnInit} from '@angular/core';
import {TableLazyLoadEvent, TableModule} from "primeng/table";
import {
  Genero,
  PacienteInput,
  stringIsNullOrEmptyOrWhitespace,
  SubscriptionsManagerUtil,
  TELEFONE_MASK
} from "../../../../tokens";
import {DatePipe, NgIf} from "@angular/common";
import {MatIcon} from "@angular/material/icon";
import {MatFabButton, MatIconButton} from "@angular/material/button";
import {DashboardProfissionaisServiceService} from "./dashboard-profissionais-service.service";
import {FilteredInput} from "../../../../tokens/models/paged-filtered-input";
import {debounceTime, filter, first, Subscription} from "rxjs";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {FormControl, ReactiveFormsModule} from "@angular/forms";
import {Router} from "@angular/router";
import {ProfissionalOutput} from "../../../../tokens/models/profissional-output";
import {HttpMedicalyModule} from "../../../http-medicaly.module";

@Component({
  selector: 'app-dashboard-profissionais',
  standalone: true,
  imports: [
    TableModule,
    NgIf,
    DatePipe,
    MatIcon,
    MatFabButton,
    MatIconButton,
    MatFormField,
    MatInput,
    MatLabel,
    ReactiveFormsModule,
    HttpMedicalyModule
  ],
  templateUrl: './dashboard-profissional.component.html',
  styleUrl: './dashboard-profissional.component.scss'
})
export class DashboardProfissionalComponent implements OnInit, OnDestroy {
  public carregado = false;
  public profissionais: Array<ProfissionalOutput>;

  public maxRows = 20;
  public generos = Genero;
  public totalProficional: number;
  public carregandoProficional = true;

  public filtroControl = new FormControl<string>('');

  private subs = new SubscriptionsManagerUtil();

  constructor(
    private service: DashboardProfissionaisServiceService,
    private router: Router
    ) {
  }

  public ngOnInit(): void {
    this.initSubtFiltro();
    this.carregado = true;
  }

  public ngOnDestroy(): void {
    this.subs.clear();
  }

  public add(): void {
    this.router.navigate(['/auth/cadastro-profissional'])
  }

  public delete(id: string): void {
    this.service.delete(id).pipe(first())
      .subscribe({
        next: result => {
          this.setProfissionais();
        }
      })
  }


  public edit(id: string): void {

  }

  public setProfissionais(evento?: TableLazyLoadEvent) {
    this.carregandoProficional = true
    const filter = new FilteredInput();
    filter.maxResultCount = Number(this.maxRows);

    if (evento) {
      filter.skipCount = Number(evento.first);
    }

    const filtro = this.filtroControl.value;
    if (!stringIsNullOrEmptyOrWhitespace(filtro)) {
      filter.filter = `${filtro}`;
    }

    this.service.getList(filter).pipe(first())
      .subscribe({
        next: (pagedResult => {
          this.profissionais = pagedResult.items;
          this.totalProficional = pagedResult.totalCount;
          this.carregandoProficional = false;
        })
      })
  }


  private initSubtFiltro(): void {
    const sub = this.filtroControl.valueChanges
      .pipe(debounceTime(200))
      .subscribe({
        next: (v) => {
          this.setProfissionais();
        }
      })
  }
}
